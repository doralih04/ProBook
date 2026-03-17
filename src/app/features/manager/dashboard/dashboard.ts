import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ReportService } from '../../../core/services/report.service';
import { ReservationService } from '../../../core/services/reservation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  today = new Date();

  // Stats
  totalRevenue = 0;
  totalBookings = 0;
  occupancyRate = 0;
  availableRooms = 6; // total rooms from mock data

  recentReservations: any[] = [];

  // Revenue Chart
  revenueChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => '$' + v }
      }
    }
  };
  revenueChartType: ChartType = 'bar';
  revenueChartData: ChartConfiguration['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      data: [45000, 59000, 80000, 61000, 56000, 75000],
      label: 'Ingresos ($)',
      backgroundColor: 'rgba(26, 48, 38, 0.75)',
      borderColor: '#1a3026',
      borderRadius: 8,
      hoverBackgroundColor: '#c5a059',
    }],
  };

  // Occupancy (Doughnut)
  occupancyChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'right' },
    }
  };
  occupancyChartType: ChartType = 'doughnut';
  occupancyChartData: ChartConfiguration['data'] = {
    labels: ['Suite', 'Doble', 'Individual'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#1a3026', '#c5a059', '#f7f3f0'],
      borderColor: ['#fff', '#fff', '#ccc'],
      borderWidth: 3,
    }],
  };

  constructor(
    private reportService: ReportService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reportService.getStats().subscribe({
      next: (stats) => {
        this.totalRevenue = stats.totalRevenue;
        this.occupancyRate = stats.occupancyRate;
      },
      error: (err) => console.error('Error fetching stats', err)
    });

    this.reportService.getDistribution().subscribe({
      next: (distribution) => {
        if (distribution && distribution.length > 0) {
          const labels = distribution.map(d => d.type);
          const values = distribution.map(d => d.count);
          this.occupancyChartData = {
            ...this.occupancyChartData,
            labels,
            datasets: [{ ...this.occupancyChartData.datasets[0], data: values }]
          };
        }
      },
      error: (err) => console.error('Error fetching distribution', err)
    });

    this.reservationService.getAllReservations().subscribe({
      next: (reservations) => {
        this.recentReservations = reservations.slice(0, 5);
        this.totalBookings = reservations.length;
        this.availableRooms = 6 - reservations.length;
      },
      error: (err) => console.log('No reservations yet or unauthorized', err)
    });
  }
}
