import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../models/project'

@Pipe({
  name: 'sortProject'
})
export class SortProjectPipe implements PipeTransform {

  transform(array: Array<any>, args: string): Array<any> {
    console.log(JSON.stringify(array), args)
    array.sort((a: any, b: any) => {
      console.log(a, b)
	    if ( a[args] < b[args] ){
	    	return -1;
	    }else if( a[args] > b[args] ){
	        return 1;
	    }else{
	    	return 0;	
	    }
    });
    return array;
  }


}
