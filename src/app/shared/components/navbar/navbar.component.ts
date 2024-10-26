import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  season = '';
  chapter = '';
  part = '';
  episode = '';

  @Input()
  set ref(val: string) {
    const { S, C, P, E } = this.parseString(val);
    this.season = S;
    this.chapter = C;
    if (P) {
      this.part = P;
    }
    this.episode = E;
  }

  private parseString(input: string) {
    const [S, C, P, E] = input.split('-');
    return { S, C, P, E };
  }
}
