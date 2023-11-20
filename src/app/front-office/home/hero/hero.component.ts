import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

  arrayOfImgUrls = [

    {
      image: 'assets/images/hero/boisson.jpg',
    },
    {
      image: 'assets/images/hero/mangue.jpg',
    },
    {
      image: 'assets/images/hero/chips.jpeg',
    }
  ]

}
