import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  // Revenue Chart
  public revenueChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public revenueChartType: ChartType = 'line';
  public revenueChartData: ChartConfiguration['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [65000, 59000, 80000, 81000, 56000, 55000],
        label: 'Ingresos',
        borderColor: '#1a3026',
        backgroundColor: 'rgba(26, 48, 38, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Occupancy Chart
  public occupancyChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public occupancyChartType: ChartType = 'doughnut';
  public occupancyChartData: ChartConfiguration['data'] = {
    labels: ['Ocupadas', 'Disponibles'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ['#c5a059', '#f7f3f0'],
        borderColor: ['#1a3026', '#1a3026'],
      },
    ],
  };

  // Stats
  totalRevenue = 437000;
  totalBookings = 234;
  occupancyRate = 75;
  availableRooms = 25;

  ngOnInit(): void {
    // Load real data from service
  }
}
