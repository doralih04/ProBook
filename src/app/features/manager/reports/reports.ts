import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/report.service';

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
export class Reports implements OnInit {
  // Monthly Bookings Chart
  public bookingsChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };
  public bookingsChartType: ChartType = 'bar';
  public bookingsChartData: ChartConfiguration['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      data: [45, 52, 38, 61, 55, 48],
      label: 'Reservas',
      backgroundColor: '#1a3026',
      borderRadius: 6,
      hoverBackgroundColor: '#c5a059',
    }],
  };

  // Revenue by Room Type
  public revenueByTypeChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'right' } },
  };
  public revenueByTypeChartType: ChartType = 'pie';
  public revenueByTypeChartData: ChartConfiguration['data'] = {
    labels: ['Individual', 'Doble', 'Suite'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#1a3026', '#c5a059', '#f7f3f0'],
      borderColor: ['#fff', '#fff', '#ccc'],
      borderWidth: 3,
    }],
  };

  // Customer Satisfaction
  public satisfactionChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true, max: 5 } },
  };
  public satisfactionChartType: ChartType = 'line';
  public satisfactionChartData: ChartConfiguration['data'] = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [{
      data: [4.2, 4.5, 4.1, 4.8],
      label: 'Satisfacción Promedio',
      borderColor: '#c5a059',
      backgroundColor: 'rgba(197, 160, 89, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  // Export reports
  exportReport(): void {
    // Implement export functionality
    alert('Funcionalidad de exportación próximamente');
  }

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getDistribution().subscribe({
      next: (dist) => {
        const labels = dist.map(d => d.type);
        const data = dist.map(d => d.count);
        this.revenueByTypeChartData.labels = labels;
        this.revenueByTypeChartData.datasets[0].data = data;
      },
      error: (err) => console.error('Error fetching distribution', err)
    });
  }
}
