import { initializeCharts, updateChart } from './charts.js';
import { setupTableSorting } from './tables.js';
import { setupThemeToggle } from './theme.js';
import { setupReportModal } from './reports.js';
import { setupSupervisorManagement, setupPassengerManagement } from './management.js';

$(document).ready(function () {
    // Burger Icon Functionality
    $('#burger-icon').click(function () {
        $('.side-panel').toggleClass('active');
    });

    // Menu Item Click Handler
    $('#menu-list li').click(function () {
        const sectionId = $(this).data('section');
        $('.dashboard-section').hide();
        $('#' + sectionId).show();
    });

    // Initialize Charts
    initializeCharts();

    // Initialize Table Sorting
    setupTableSorting();

    // Initialize Theme Toggle
    setupThemeToggle();

    // Initialize Report Modal
    setupReportModal();

    // Initialize Supervisor Management
    setupSupervisorManagement();

    // Initialize Passenger Management
    setupPassengerManagement();

    // Chart Expansion
    $('.chart').click(function () {
        $(this).toggleClass('expanded');
    });
});