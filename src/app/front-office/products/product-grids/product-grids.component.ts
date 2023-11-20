import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/layouts/vitrine/service/category.service';
import { Category } from 'src/app/layouts/vitrine/models/category.model';
import { Attachement } from '../models/attachement.model';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Country } from '../models/country.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-grids',
  templateUrl: './product-grids.component.html',
  styleUrls: ['./product-grids.component.scss']
})
export class ProductGridsComponent implements OnInit {

  listProduct: Product[] = [];
  product: Product = new Product();
  listCategory: Category[] = [];
  atachement: Attachement[] = [];
  search: string = '';
  page: number = 1;
  pageSize: number = 9;
  totalItem: number = 0;
  searchTerms = new Subject<string>(); // Observable de termes de recherche
  searchQuery!: string;
  displayedProduct: Product[] = [];
  itemId: number = 0;
  listperPage: any;
  items: any;
  wishList: any;
  wishBadge: number = 0;
  countryList: Country[] = [];
  country: Country = new Country();
  selectedCountryId: number = 1;
  selectedPageSize: number = 1;
  maxSize = 5;
  totalItems: number = 0;
  activeMenuIndex: number = -1;


  constructor(private service: ProductService, private categoryService: CategoryService,
    private activeRoute: ActivatedRoute, private cdr: ChangeDetectorRef,
    private notification: NzNotificationService,
    ) {

  }

  ngOnInit(): void {
    this.itemId = this.activeRoute.snapshot.params['categoryKey']!;
    this.getAllProductByCountry(this.selectedCountryId);
    // this.getAllProduct();
    this.getAllCategory();
    this.filterProducts();
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.service.getSearch(term))
      )
      .subscribe((data: { data: Product[] }) => {
        this.listProduct = data.data || [];
        this.displayedProduct = this.listProduct.slice(0, this.pageSize);
        this.items = this.listProduct.length;
        this.cdr.detectChanges();
      });

    this.getAllCountry();
    this.getAllSize();
  }

  getPageSize(event: number) {
    this.pageSize = event;
    this.displayedProduct.length = this.pageSize;
  }

  getCountry() {
    console.log("Pays Id : ", this.selectedCountryId)
    this.getAllProductByCountry(this.selectedCountryId!);
  }

  getAllProductByCountry(id: number) {
    this.service.getAllProductListByCountry(id).subscribe((response: any) => {
      this.listProduct = response.data;
      this.totalItem = this.listProduct.length;
      if (this.totalItem <= this.pageSize) {
        this.displayedProduct = this.listProduct;
      } else {
        this.displayedProduct = this.listProduct.slice(0, this.pageSize);
      }
      this.cdr.detectChanges();
    });
  }


  getAllCountry() {
    this.service.getAllCountry().subscribe((response: any) => {
      this.countryList = response.data;
      console.log("Liste des Pays : ", this.countryList)
    });
  }

  getAllSize() {
    this.listperPage = [
      {
        size: 9
      },
      {
        size: 25
      },
      {
        size: 50
      },
      {
        size: 100
      }
    ];
  }

  changerParPage(pageSize: number) {
    this.pageSize = pageSize;
    console.log("Nombre de Produits Pare Page : ", this.page)

  }

  getAllCategory() {
    this.categoryService.getCategorieProductList().subscribe((response: any) => {
      this.listCategory = response.data;
    });
  }


  getProducts(category: number) {

    if (category !== undefined) {
      console.log("Category : ", category)
      this.service.getAllProductListByCountryAndCategroy(this.selectedCountryId, category).subscribe((response: any) => {
        this.listProduct = response.data;
        this.totalItem = this.listProduct.length;
        this.activeMenuIndex = category;
        if (this.totalItem <= this.pageSize) {
          this.displayedProduct = this.listProduct;
        } else {
          this.displayedProduct = this.listProduct.slice(0, this.pageSize);
        }
        this.cdr.detectChanges();
      });
    }
  }

  getProductsAttachement(id: number) {
    this.service.getProductAttachement(id).subscribe((reponse: any) => {
      this.atachement = reponse.data;
      console.log("Attachement : ", reponse.data)
    });
  }

  addToCart(id: number, template: TemplateRef<{}>) {
    this.service.addCart(id).subscribe((response: any) => {
      this.service.getListCart().subscribe((newListe) => {
        console.log("Cart List", newListe);
      });

    });
    this.notification.template(template);
  }
  searchProducts(term: string): void {
    this.searchTerms.next(term);
  }

  autoSearch() {
    if (!this.searchQuery) {
      // this.getAllProductByCountry(this.selectedCountryId);
      this.getAllProductByCountry(this.selectedCountryId);
    } else {
      this.searchProducts(this.searchQuery);
    }
  }

  filterProducts() {
    this.listProduct.filter(product => {
      return (
        product.libelle?.toLowerCase().includes(this.search.toLowerCase()) ||
        product.description?.toLowerCase().includes(this.search.toLowerCase())
      );
    });
    console.log("List des Produits : ", this.listProduct)
  }

  addWish(id: number, template: TemplateRef<{}>) {
    this.service.addWish(id).subscribe((response: any) => {
      this.product = response.data;
      this.notification.template(template);
      this.getAllProductByCountry(this.selectedCountryId);
      this.cdr.detectChanges();
    });

  }

  getStarArray(star: string): number[] {
    const starNumner = parseInt(star);
    return new Array(starNumner);
  }

  isItemVisible(index: number): boolean {
    this.items = index < this.pageSize * this.page && index >= this.pageSize * (this.page - 1);
    console.log("")
    return index < this.pageSize * this.page && index >= this.pageSize * (this.page - 1);
  }

}
