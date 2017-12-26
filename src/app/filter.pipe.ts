import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(services, value: string) {
    const input = value.toUpperCase();
    return services.filter(service => {
      // return service.title.includes(value.toUpperCase());
        return service.title.toUpperCase().indexOf(input) > -1;
    });
  }
}
