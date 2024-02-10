import {
  CashFlowCategoryService
} from "../../main-module/cash-flow-list/components/cash-flow-category/services/cash-flow-category.service";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {map, Observable, of} from "rxjs";
import {
  CashFlowCategoryComponent
} from "../../main-module/cash-flow-list/components/cash-flow-category/cash-flow-category.component";

export class CategoryValidators {
  public static checkExisting(service: CashFlowCategoryService, categoryComponent: CashFlowCategoryComponent): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control?.value !== null && control.value.toString().trim() !== '') {
        if (
          categoryComponent.currentCategoryName !== null &&
          categoryComponent.currentCategoryName.trim() !== '' &&
          categoryComponent.currentCategoryName.trim().toUpperCase() === control.value.toString().trim().toUpperCase()
        ) {
          return of({});
        } else {
          return service.checkIfCategoryExist(control.value.toString().trim()).pipe(
            map((result: boolean) => {
              if (result) {
                return {
                  categoryAlreadyExists: true
                };
              } else {
                return null;
              }
            })
          );
        }
      } else { return of({}); }
    };
  }
}
