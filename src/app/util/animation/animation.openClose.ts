import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const animationOpenClose = trigger('openClose', [
  state(
    'open',
    style({
      height: '*',
      opacity: 1,
      overflow: 'hidden',
    })
  ),
  state(
    'closed',
    style({
      height: '0px',
      opacity: 0,
      overflow: 'hidden',
    })
  ),
  transition('open <=> closed', [animate('300ms ease-in-out')]),
]);
