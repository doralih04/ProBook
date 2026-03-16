import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    BaseChartDirective
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {
  // Monthly Bookings Chart
  public bookingsChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public bookingsChartType: ChartType = 'bar';
  public bookingsChartData: ChartConfiguration['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [45, 52, 38, 61, 55, 48],
        label: 'Reservas',
        backgroundColor: '#1a3026',
        borderColor: '#c5a059',
        borderWidth: 2,
      },
    ],
  };

  // Revenue by Room Type
  public revenueByTypeChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public revenueByTypeChartType: ChartType = 'pie';
  public revenueByTypeChartData: ChartConfiguration['data'] = {
    labels: ['Individual', 'Doble', 'Suite'],
    datasets: [
      {
        data: [150000, 200000, 87000],
        backgroundColor: ['#1a3026', '#c5a059', '#f7f3f0'],
        borderColor: ['#1a3026', '#c5a059', '#1a3026'],
      },
    ],
  };

  // Customer Satisfaction
  public satisfactionChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };
  public satisfactionChartType: ChartType = 'line';
  public satisfactionChartData: ChartConfiguration['data'] = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [
      {
        data: [4.2, 4.5, 4.1, 4.8],
        label: 'Satisfacción Promedio',
        borderColor: '#c5a059',
        backgroundColor: 'rgba(197, 160, 89, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Export reports
  exportReport(): void {
    // Implement export functionality
    alert('Funcionalidad de exportación próximamente');
  }
}
