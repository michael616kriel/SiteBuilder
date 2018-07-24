import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
	    if ( a[args].toLowerCase() < b[args].toLowerCase() ){
	    	return -1;
	    }else if( a[args].toLowerCase() > b[args].toLowerCase() ){
	        return 1;
	    }else{
	    	return 0;	
	    }
    });
    return array;
  }

}
