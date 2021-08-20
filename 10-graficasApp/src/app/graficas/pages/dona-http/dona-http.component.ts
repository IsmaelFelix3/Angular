import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { GraficasService } from '../../services/graficas.service';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [
  ]
})
export class DonaHttpComponent implements OnInit {

  constructor(private graficasService: GraficasService) { }

  ngOnInit(): void 
  {
    // this.graficasService.getUsuariosRedesSociales().subscribe(data => {
      
    //   // el object es un objeto propio de js y el keys es un metodo de todos los objetos,
    //   //  le mando un objeto y le digo que me de todas las llaves
    //   const labels = Object.keys(data);
    //   const values = Object.values(data);
    //   this.doughnutChartLabels = labels;

    //   this.doughnutChartData.push(values);
    //   console.log(labels);
    // })

    this.graficasService.getUsuariosRedesSocialesOptimo().subscribe( ({ labels, values}) => {
      this.doughnutChartLabels = labels;
      // se hace un push porque es un arreglo que acepta una arreglo
      this.doughnutChartData.push(values)
    })


  }

  // Doughnut
 public doughnutChartLabels: Label[] = [
   
  ];
 public doughnutChartData: MultiDataSet = [
   
 ];

 public doughnutChartType: ChartType = 'doughnut';

//  la grafica de dona necesita que le mandemos los colores asi, un arreglo en el background
 public colors: Color[]=[
   {
     backgroundColor: ['#6965F6', '#57B6D4', '#65F6F2','#9FE861', '#F28666']
   }
 ]

}
