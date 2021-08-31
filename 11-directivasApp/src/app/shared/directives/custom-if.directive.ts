import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[customIf]'
})
export class CustomIfDirective {

  // se necesita mandar la referencia al elemento html
  @Input() set customIf( condicion: boolean )
  {
    if( condicion )
    {
      // asi se muestra, mandando la referencia al elemento
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else
    {
      // asi lo oculto
      this.viewContainer.clear();
    }
  }

  // el template ref es parecido al element ref solo que esta a un nivel superior , un nivel mas alto
  constructor(private templateRef: TemplateRef<HTMLElement>,
              private viewContainer: ViewContainerRef) {}

}
