import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(services, value: string) {
    return services.filter(service => {
      return service.title.includes(value);
    });
  }
}
