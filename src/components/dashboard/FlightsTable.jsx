import React, { useState, useEffect } from "react";
import { 
  PlaneTakeoff, ArrowRight, AlertTriangle, CheckCircle, Clock, 
  Search, Filter, ChevronLeft, ChevronRight, MapPin, X, 
  Wind, Cloud, Droplets, Thermometer, Zap, Calendar, 
  BarChart, BadgeAlert, Cpu, Play, Pause, RotateCcw, 
  ChevronDown, ChevronUp, Settings, Activity, Fuel, Timer, 
  DollarSign, Shield, Leaf, Smile, Gauge, Users, 
  CloudSun, CloudRain, CloudLightning, CloudSnow, Sun, 
  Moon, Star, Heart, Brain, Target, ArrowUpRight, 
  ArrowDownRight, TrendingUp, TrendingDown, LineChart, 
  BarChart2, PieChart, AlertCircle, CheckCircle2, XCircle, 
  Info, HelpCircle, ThumbsUp, ThumbsDown, Flag, Award, 
  Trophy, Medal, Crown, Coffee, Snowflake, Umbrella, 
  Sunrise, Sunset, Compass, Map, Navigation, Crosshair 
} from "lucide-react";

const styles = `
  .crew-workflow-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .crew-workflow-modal {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .workflow-status {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .status-badge {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .status-badge.initializing {
    background-color: #fef3c7;
    color: #92400e;
  }

  .status-badge.in_progress {
    background-color: #dbeafe;
    color: #1e40af;
  }

  .status-badge.completed {
    background-color: #d1fae5;
    color: #065f46;
  }

  .workflow-steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .workflow-step {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    transition: all 0.2s;
  }

  .workflow-step.active {
    border-color: #3b82f6;
    background-color: #eff6ff;
  }

  .step-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    background-color: #f3f4f6;
  }

  .active .step-icon {
    background-color: #3b82f6;
    color: white;
  }

  .step-content h5 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .step-content p {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: #6b7280;
  }

  .resource-allocation {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .resource-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .resource-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background-color: #f9fafb;
  }

  .resource-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    background-color: #e5e7eb;
    color: #4b5563;
  }

  .resource-details h5 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .resource-details p {
    margin: 0.25rem 0 0;
    font-size: 0.75rem;
    color: #6b7280;
  }

  .workflow-actions {
    padding: 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .action-btn.primary {
    background-color: #3b82f6;
    color: white;
    border: none;
  }

  .action-btn.primary:hover {
    background-color: #2563eb;
  }

  .action-btn.primary:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }

  .action-btn.secondary {
    background-color: white;
    color: #4b5563;
    border: 1px solid #e5e7eb;
  }

  .action-btn.secondary:hover {
    background-color: #f9fafb;
  }

  .deployment-progress {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 8px;
  }

  .progress-step {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  .progress-step.active {
    opacity: 1;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .progress-step.completed {
    opacity: 1;
    background: #f0fdf4;
  }

  .step-indicator {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .active .step-indicator {
    background: #3b82f6;
    color: white;
  }

  .completed .step-indicator {
    background: #22c55e;
    color: white;
  }

  .progress-step-content {
    flex: 1;
  }

  .progress-step-title {
    font-weight: 500;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }

  .progress-step-description {
    font-size: 0.875rem;
    color: #64748b;
  }

  .loading-dots {
    display: inline-flex;
    gap: 0.25rem;
    margin-left: 0.5rem;
  }

  .loading-dots span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: currentColor;
    animation: loadingDots 1.4s infinite;
  }

  .loading-dots span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loading-dots span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes loadingDots {
    0%, 80%, 100% { transform: scale(0); opacity: 0; }
    40% { transform: scale(1); opacity: 1; }
  }

  .progress-detail-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(17, 24, 39, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
    animation: fadeIn 0.3s ease;
  }

  .progress-detail-modal {
    background: linear-gradient(135deg, #ffffff, #f8fafc);
    border-radius: 20px;
    width: 90%;
    max-width: 1000px;
    height: 85vh;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 0;
    position: relative;
    animation: slideUp 0.4s ease;
  }

  .progress-visualization {
    background: #ffffff;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    border-right: 1px solid rgba(226, 232, 240, 0.6);
    position: relative;
    overflow-y: auto;
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;
  }

  .progress-header::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #3b82f6, transparent);
    animation: scanLine 2s infinite;
  }

  .progress-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: -0.01em;
    position: relative;
  }

  .progress-title::before {
    content: 'AI';
    position: absolute;
    top: -0.5rem;
    left: 0;
    font-size: 0.75rem;
    font-weight: 700;
    color: #3b82f6;
    opacity: 0.8;
    animation: pulse 2s infinite;
  }

  .progress-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .stat-card {
    background: linear-gradient(135deg, #f8fafc, #ffffff);
    padding: 1rem;
    border-radius: 12px;
    border: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    animation: progressBar 2s infinite;
  }

  .stat-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #64748b;
    font-size: 0.875rem;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin: 0.25rem 0;
    position: relative;
  }

  .stat-value::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #3b82f6, transparent);
    animation: scanLine 2s infinite;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
  }

  .progress-timeline {
    position: relative;
    padding: 1rem 0 1rem 2rem;
    margin-top: 0.5rem;
  }

  .timeline-line {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #e2e8f0, transparent);
    border-radius: 2px;
  }

  .timeline-progress {
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    background: linear-gradient(to bottom, #3b82f6, #2563eb);
    border-radius: 2px;
    transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    animation: pulseGlow 2s infinite;
  }

  .timeline-item {
    position: relative;
    padding-bottom: 1.5rem;
    opacity: 0.7;
    transform: translateX(0);
    transition: all 0.3s ease;
  }

  .timeline-item.active {
    opacity: 1;
    transform: translateX(5px);
  }

  .timeline-item.completed {
    opacity: 1;
  }

  .timeline-dot {
    position: absolute;
    left: -1.8rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #e2e8f0;
    border: 2px solid #ffffff;
    box-shadow: 0 0 0 2px rgba(226, 232, 240, 0.5);
    transition: all 0.3s ease;
  }

  .timeline-item.active .timeline-dot {
    background: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    animation: pulse 2s infinite, glow 2s infinite;
  }

  .timeline-item.completed .timeline-dot {
    background: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.3);
    animation: glow 2s infinite;
  }

  .timeline-content {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem;
    margin-left: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
    position: relative;
    overflow: hidden;
  }

  .timeline-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, transparent);
    animation: scanLine 2s infinite;
  }

  .timeline-item.active .timeline-content {
    border-color: #3b82f6;
    background: linear-gradient(to right, #eff6ff, #ffffff);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }

  .timeline-item.completed .timeline-content {
    border-color: #22c55e;
    background: linear-gradient(to right, #f0fdf4, #ffffff);
  }

  .resource-status {
    background: #f8fafc;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-content: start;
    overflow-y: auto;
  }

  .resource-status-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 1.25rem;
    border: 1px solid rgba(226, 232, 240, 0.8);
  }

  .resource-status-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .resource-status-icon {
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    background: linear-gradient(135deg, #f1f5f9, #f8fafc);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
  }

  .resource-status-title {
    font-weight: 600;
    color: #1e293b;
    font-size: 0.875rem;
  }

  .resource-status-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #0f172a;
    margin: 0.5rem 0 0.25rem;
    letter-spacing: -0.02em;
  }

  .resource-status-subtitle {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;
  }

  .status-badge {
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .loading-dots {
    display: inline-flex;
    gap: 0.2rem;
    margin-left: 0.375rem;
  }

  .loading-dots span {
    width: 3px;
    height: 3px;
    border-radius: 50%;
  }

  .progress-detail-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.375rem;
    border-radius: 8px;
  }

  @keyframes scanLine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
    }
    50% {
      box-shadow: 0 0 10px 2px rgba(59, 130, 246, 0.4);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
    }
    50% {
      box-shadow: 0 0 8px 2px rgba(59, 130, 246, 0.4);
    }
  }

  @keyframes progressBar {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
  }

  .route-workflow-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(17, 24, 39, 0.7);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
    animation: fadeIn 0.3s ease;
  }

  .route-workflow-modal {
    background: linear-gradient(135deg, #ffffff, #f8fafc);
    border-radius: 20px;
    width: 90%;
    max-width: 1000px;
    height: 85vh;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    position: relative;
    animation: slideUp 0.4s ease;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid rgba(226, 232, 240, 0.6);
    background: #ffffff;
  }

  .modal-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .modal-title h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
  }

  .modal-close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 8px;
    background: #f1f5f9;
    color: #64748b;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .modal-close-btn:hover {
    background: #e2e8f0;
    color: #1e293b;
    transform: scale(1.05);
  }

  .modal-content {
    padding: 1.5rem;
    height: calc(100% - 4.5rem);
    overflow-y: auto;
  }

  .completion-details {
    padding: 2rem;
    background: linear-gradient(135deg, #ffffff, #f8fafc);
    border-radius: 24px;
    animation: fadeIn 0.5s ease;
  }

  .completion-header {
    text-align: center;
    margin-bottom: 2.5rem;
    position: relative;
  }

  .completion-header::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }

  .completion-icon {
    position: relative;
    display: inline-flex;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border-radius: 50%;
  }

  .completion-icon svg {
    width: 48px;
    height: 48px;
    color: #22c55e;
    filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.3));
  }

  .completion-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.2), transparent 70%);
    border-radius: 50%;
    animation: pulseGlow 2s infinite;
  }

  .completion-header h4 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
    margin: 1rem 0 0.5rem;
    background: linear-gradient(90deg, #1e293b, #334155);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .completion-subtitle {
    font-size: 1.1rem;
    color: #64748b;
    margin-top: 0.75rem;
  }

  .scenario-results {
    margin-top: 3rem;
  }

  .scenario-results h5 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .scenario-results h5::before {
    content: '';
    display: block;
    width: 4px;
    height: 24px;
    background: linear-gradient(to bottom, #3b82f6, #2563eb);
    border-radius: 2px;
  }

  .result-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .result-card {
    background: linear-gradient(145deg, #ffffff, #f8fafc);
    border-radius: 20px;
    padding: 1.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    border: 1px solid rgba(226, 232, 240, 0.8);
    position: relative;
    overflow: hidden;
  }

  .result-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .result-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.15);
  }

  .result-card:hover::before {
    opacity: 1;
  }

  .result-icon {
    position: relative;
    display: inline-flex;
    padding: 1rem;
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border-radius: 16px;
    margin-bottom: 1.25rem;
  }

  .result-icon svg {
    width: 32px;
    height: 32px;
  }

  .route-card .result-icon {
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
  }

  .route-card .result-icon svg {
    color: #2563eb;
  }

  .fuel-card .result-icon {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
  }

  .fuel-card .result-icon svg {
    color: #d97706;
  }

  .time-card .result-icon {
    background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  }

  .time-card .result-icon svg {
    color: #7c3aed;
  }

  .cost-card .result-icon {
    background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  }

  .cost-card .result-icon svg {
    color: #16a34a;
  }

  .result-content h6 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.75rem;
  }

  .result-value {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(90deg, #1e293b, #334155);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0.75rem 0;
    letter-spacing: -0.02em;
  }

  .progress-bar {
    height: 6px;
    background: #e2e8f0;
    border-radius: 3px;
    overflow: hidden;
    margin-top: 1rem;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    border-radius: 3px;
    transition: width 1s ease;
  }

  .route-path {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    padding: 0.75rem;
    background: #f8fafc;
    border-radius: 12px;
  }

  .route-point {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: #334155;
    padding: 0.5rem 0.75rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .route-point svg {
    color: #60a5fa;
  }

  @keyframes pulseGlow {
    0% {
      transform: translate(-50%, -50%) scale(0.95);
      opacity: 0.6;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
      opacity: 0.3;
    }
    100% {
      transform: translate(-50%, -50%) scale(0.95);
      opacity: 0.6;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const getRiskBadge = (risk) => {
  switch (risk.toLowerCase()) {
    case 'high':
      return <span className="risk-badge risk-high">High Risk</span>;
    case 'medium':
      return <span className="risk-badge risk-medium">Medium Risk</span>;
    case 'low':
      return <span className="risk-badge risk-low">Low Risk</span>;
    default:
      return <span className="risk-badge risk-low">Unknown</span>;
  }
};

const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case 'scheduled':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Scheduled</span>;
    case 'in air':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">In Air</span>;
    case 'delayed':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Delayed</span>;
    case 'arrived':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Arrived</span>;
    case 'cancelled':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Cancelled</span>;
    default:
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">Unknown</span>;
  }
};

// Format date for display
const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const FlightsTable = ({ flights }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeView, setActiveView] = useState("all");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [aiProcessing, setAiProcessing] = useState(false);
  const flightsPerPage = 6;
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationResults, setSimulationResults] = useState(null);
  const [expandedScenario, setExpandedScenario] = useState(null);
  const [selectedVariables, setSelectedVariables] = useState({
    weather: "current",
    traffic: "normal",
    fuelPrice: "current",
    crewAvailability: "normal"
  });
  const [crewWorkflowStatus, setCrewWorkflowStatus] = useState(null);
  const [showCrewWorkflowModal, setShowCrewWorkflowModal] = useState(false);
  const [selectedCrewScenario, setSelectedCrewScenario] = useState(null);
  const [deploymentSteps, setDeploymentSteps] = useState([
    {
      id: 1,
      title: 'Connecting to Sabre Crew Management System',
      description: 'Establishing secure connection to Sabre CMS',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Finding Available Resources',
      description: 'Scanning for available crew members and equipment',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Mapping with Current Need',
      description: 'Analyzing requirements and matching with resources',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Completing Resource Allocation',
      description: 'Finalizing assignments and schedules',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Updating Sabre Crew Management System',
      description: 'Synchronizing changes with Sabre CMS',
      status: 'pending'
    }
  ]);
  const [showProgressDetail, setShowProgressDetail] = useState(false);
  const [routeWorkflowStatus, setRouteWorkflowStatus] = useState(null);
  const [showRouteWorkflowModal, setShowRouteWorkflowModal] = useState(false);
  const [selectedRouteScenario, setSelectedRouteScenario] = useState(null);
  const [routeSteps, setRouteSteps] = useState([
    {
      id: 1,
      title: 'Connecting to LIDO System',
      description: 'Establishing secure connection to Lufthansa Integrated Dispatch Operations',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Analyzing Current Route',
      description: 'Processing current flight path and waypoints in LIDO',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Evaluating Weather Patterns',
      description: 'Assessing weather conditions using LIDO weather integration',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Optimizing Air Traffic',
      description: 'Calculating optimal airspace utilization via LIDO',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Generating Alternative Routes',
      description: 'Creating optimized flight paths using LIDO algorithms',
      status: 'pending'
    },
    {
      id: 6,
      title: 'Updating Flight Plan',
      description: 'Implementing new route in LIDO flight management system',
      status: 'pending'
    }
  ]);
  const [showRouteProgressDetail, setShowRouteProgressDetail] = useState(false);

  useEffect(() => {
    // Filter flights based on search query
    if (searchQuery.trim() === "") {
      setFilteredFlights(flights);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = flights.filter(
        (flight) =>
          flight.id.toLowerCase().includes(lowercasedQuery) ||
          flight.origin.toLowerCase().includes(lowercasedQuery) ||
          flight.destination.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredFlights(filtered);
    }
  }, [searchQuery, flights]);

  // Filter by active view
  useEffect(() => {
    if (activeView === "all") {
      setFilteredFlights(flights);
    } else if (activeView === "active") {
      setFilteredFlights(flights.filter(flight => flight.status !== "Landed"));
    } else if (activeView === "delayed") {
      setFilteredFlights(flights.filter(flight => flight.status === "Delayed"));
    } else if (activeView === "highRisk") {
      setFilteredFlights(flights.filter(flight => flight.risk === "High"));
    }
  }, [activeView, flights]);

  // Add style tag to the component
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    return () => styleElement.remove();
  }, []);

  const getStatusIndicator = (status) => {
    switch (status) {
      case "On Time":
        return (
          <div className="status-indicator status-ontime">
            <CheckCircle size={16} />
            <span>On Time</span>
          </div>
        );
      case "Delayed":
        return (
          <div className="status-indicator status-delayed">
            <Clock size={16} />
            <span>Delayed</span>
          </div>
        );
      case "Warning":
        return (
          <div className="status-indicator status-warning">
            <AlertTriangle size={16} />
            <span>Warning</span>
          </div>
        );
      default:
        return (
          <div className="status-indicator">
            <span>{status}</span>
          </div>
        );
    }
  };

  const handleViewDetails = (flight) => {
    setSelectedFlight(flight);
    setShowDetailModal(true);
    
    // Simulate AI processing and recommendation
    setAiProcessing(true);
    setAiRecommendation("");
    
    setTimeout(() => {
      let recommendation = "";
      
      // Generate different AI recommendations based on flight status and risk
      if (flight.risk === "High" && flight.status === "Delayed") {
        recommendation = "Recommend alternate route via BIGUR waypoint to avoid inclement weather pattern. Projected fuel saving of 12% and potential arrival time improvement of 28 minutes.";
      } else if (flight.risk === "Medium") {
        recommendation = "Consider altitude adjustment to FL340 based on current wind patterns. Analysis shows potential 8% fuel efficiency improvement.";
      } else if (flight.origin === "JFK" || flight.destination === "JFK") {
        recommendation = "New York metro area experiencing 15% increased traffic volume. Suggest requesting priority landing slot now to avoid potential delays.";
      } else if (flight.aircraft.includes("737")) {
        recommendation = "Maintenance records indicate minor calibration issue with starboard sensor array. Not flight-critical but recommend maintenance check at destination.";
      } else {
        recommendation = "Current flight parameters optimal. No immediate action required, continuing to monitor atmospheric conditions along flight path.";
      }
      
      setAiRecommendation(recommendation);
      setAiProcessing(false);
    }, 1500);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedFlight(null);
    setAiRecommendation("");
  };

  // Get current flights for pagination
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  // Get random weather data for flight details
  const getWeatherData = (flight) => {
    // Generate pseudo-random but consistent data based on flight ID
    const hash = flight.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const absHash = Math.abs(hash);
    
    return {
      windSpeed: (10 + (absHash % 20)) + " knots",
      windDirection: ((absHash % 360)) + "°",
      temperature: (5 + (absHash % 25)) + "°C",
      humidity: (30 + (absHash % 50)) + "%",
      pressure: (980 + (absHash % 40)) + " hPa",
      visibility: (absHash % 10 > 7 ? "Excellent" : absHash % 10 > 4 ? "Good" : "Moderate")
    };
  };

  // Get flight path visualization data
  const getFlightPathData = (flight) => {
    // This would connect to a real tracking system in a production app
    // We're generating dummy data for the demo
    const flightDuration = 180; // 3 hours in minutes
    const currentProgress = (flight.id.charCodeAt(0) + flight.id.charCodeAt(flight.id.length-1)) % 100;
    
    return {
      progress: currentProgress,
      elapsedTime: Math.floor(currentProgress * flightDuration / 100),
      remainingTime: Math.floor((100 - currentProgress) * flightDuration / 100),
      altitude: (30 + (flight.id.charCodeAt(2) % 10)) + "," + (flight.id.charCodeAt(3) % 1000).toString().padStart(3, '0') + " ft",
      groundSpeed: (400 + (flight.id.charCodeAt(1) % 150)) + " knots"
    };
  };

  const handleViewSimulation = (flight) => {
    setSelectedSimulation(flight);
    setShowSimulationModal(true);
    setSimulationProgress(0);
    setSimulationResults(null);
    setSimulationRunning(false);
  };

  const runSimulation = () => {
    setSimulationRunning(true);
    setSimulationProgress(0);
    setSimulationResults(null);

    // Generate dynamic results based on selected variables
    const generateDynamicResults = () => {
      const results = [];
      
      // Optimal Route Adjustment Scenario
      if (selectedVariables.traffic !== "low") {
        const trafficImpact = selectedVariables.traffic === "high" ? 15 : 8;
        results.push({
          id: 1,
          scenario: "Optimal Route Adjustment",
          probability: selectedVariables.weather === "optimal" ? 92 : 85,
          impact: selectedVariables.traffic === "high" ? "High" : "Medium",
          outcomes: {
            fuelSavings: `${trafficImpact}%`,
            timeReduction: `${trafficImpact + 10} minutes`,
            costSavings: `$${(trafficImpact * 250).toFixed(0)}`,
            riskLevel: "Low",
            additionalMetrics: {
              co2Reduction: `${(trafficImpact * 0.8).toFixed(1)} tons`,
              passengerSatisfaction: "High",
              operationalEfficiency: `${(100 - trafficImpact).toFixed(0)}%`,
              routeOptimization: `${(trafficImpact * 1.5).toFixed(0)}%`
            },
            visualization: {
              type: "route",
              data: {
                currentPath: ["Origin", "Waypoint A", "Waypoint B", "Destination"],
                optimizedPath: ["Origin", "Waypoint C", "Waypoint D", "Destination"],
                savings: trafficImpact
              }
            }
          },
          description: `Rerouting through ${selectedVariables.traffic === "high" ? "alternative airspace" : "less congested routes"} while maintaining optimal safety margins. AI analysis suggests this route will reduce fuel consumption and improve on-time performance.`
        });
      }

      // Weather-based Scenario
      if (selectedVariables.weather !== "optimal") {
        const weatherImpact = selectedVariables.weather === "adverse" ? 12 : 8;
        results.push({
          id: 2,
          scenario: "Weather Optimization",
          probability: 90,
          impact: selectedVariables.weather === "adverse" ? "High" : "Medium",
          outcomes: {
            fuelSavings: `${weatherImpact}%`,
            timeReduction: `${weatherImpact + 5} minutes`,
            costSavings: `$${(weatherImpact * 200).toFixed(0)}`,
            riskLevel: selectedVariables.weather === "adverse" ? "Medium" : "Low",
            additionalMetrics: {
              turbulenceReduction: `${(weatherImpact * 1.2).toFixed(0)}%`,
              passengerComfort: "Improved",
              weatherAvoidance: `${(weatherImpact * 1.5).toFixed(0)}%`,
              safetyMargin: "Enhanced"
            },
            visualization: {
              type: "weather",
              data: {
                currentConditions: ["Turbulence", "Headwinds", "Precipitation"],
                optimizedConditions: ["Smooth Air", "Tailwinds", "Clear Skies"],
                improvement: weatherImpact
              }
            }
          },
          description: `Altitude and route adjustments to optimize for ${selectedVariables.weather === "adverse" ? "severe" : "moderate"} weather conditions. AI-powered weather analysis suggests optimal flight levels and routing to minimize turbulence and maximize efficiency.`
        });
      }

      // Fuel Efficiency Scenario
      if (selectedVariables.fuelPrice !== "low") {
        const fuelImpact = selectedVariables.fuelPrice === "high" ? 18 : 10;
        results.push({
          id: 3,
          scenario: "Fuel Efficiency Optimization",
          probability: 95,
          impact: selectedVariables.fuelPrice === "high" ? "High" : "Medium",
          outcomes: {
            fuelSavings: `${fuelImpact}%`,
            timeReduction: `${Math.floor(fuelImpact/2)} minutes`,
            costSavings: `$${(fuelImpact * 300).toFixed(0)}`,
            riskLevel: "Low",
            additionalMetrics: {
              fuelEfficiency: `${(fuelImpact * 1.2).toFixed(0)}%`,
              carbonFootprint: `${(fuelImpact * 0.9).toFixed(1)} tons`,
              payloadOptimization: `${(fuelImpact * 0.7).toFixed(0)}%`,
              enginePerformance: "Optimal"
            },
            visualization: {
              type: "fuel",
              data: {
                currentConsumption: "Standard",
                optimizedConsumption: "Efficient",
                savings: fuelImpact
              }
            }
          },
          description: `Optimized flight parameters for maximum fuel efficiency under ${selectedVariables.fuelPrice === "high" ? "elevated" : "current"} fuel prices. AI analysis suggests optimal speed, altitude, and engine settings to minimize fuel consumption while maintaining schedule integrity.`
        });
      }

      // Crew Optimization Scenario
      if (selectedVariables.crewAvailability !== "optimal") {
        const crewImpact = selectedVariables.crewAvailability === "limited" ? 20 : 12;
        results.push({
          id: 4,
          scenario: "Crew Resource Management",
          probability: 88,
          impact: selectedVariables.crewAvailability === "limited" ? "High" : "Medium",
          outcomes: {
            fuelSavings: `${Math.floor(crewImpact/2)}%`,
            timeReduction: `${crewImpact} minutes`,
            costSavings: `$${(crewImpact * 150).toFixed(0)}`,
            riskLevel: selectedVariables.crewAvailability === "limited" ? "Medium" : "Low",
            additionalMetrics: {
              crewEfficiency: `${(100 - crewImpact/2).toFixed(0)}%`,
              fatigueReduction: `${(crewImpact * 0.8).toFixed(0)}%`,
              complianceScore: "100%",
              restPeriods: "Optimized"
            },
            visualization: {
              type: "crew",
              data: {
                currentSchedule: ["Standard Rotation", "Fixed Rest"],
                optimizedSchedule: ["Dynamic Rotation", "Flexible Rest"],
                improvement: crewImpact
              }
            }
          },
          description: `Optimized crew scheduling and rotation to maintain operational efficiency under ${selectedVariables.crewAvailability} availability conditions. AI-powered crew management suggests optimal duty periods and rest schedules to maximize crew performance and compliance.`
        });
      }

      return results;
    };

    // Simulate processing time with visual feedback
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setSimulationProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setSimulationRunning(false);
        setSimulationResults(generateDynamicResults());
      }
    }, 100);
  };

  // Add a console log to debug simulation results
  useEffect(() => {
    if (simulationResults) {
      console.log('Simulation Results:', simulationResults);
    }
  }, [simulationResults]);

  const resetSimulation = () => {
    setSimulationProgress(0);
    setSimulationResults(null);
    setSimulationRunning(false);
  };

  const handleApplyScenario = (scenario) => {
    console.log('Applying scenario:', scenario);
    console.log('Scenario type:', scenario.scenario);
    
    // Normalize the scenario name for comparison
    const scenarioName = scenario.scenario?.trim() || '';
    
    if (scenarioName === "Crew Resource Management") {
      console.log('Opening crew workflow modal');
      setSelectedCrewScenario(scenario);
      setShowCrewWorkflowModal(true);
      setCrewWorkflowStatus('initializing');
    } else if (scenarioName === "Optimal Route Adjustment") {
      console.log('Opening route workflow modal');
      setSelectedRouteScenario(scenario);
      setShowRouteWorkflowModal(true);
      setRouteWorkflowStatus('initializing');
    } else {
      console.log('Unknown scenario type:', scenarioName);
    }
  };

  const handleStartDeployment = () => {
    setCrewWorkflowStatus('in_progress');
    setShowProgressDetail(true);
    
    // Reset all steps to pending
    setDeploymentSteps(steps => steps.map(step => ({ ...step, status: 'pending' })));
    
    // Process each step with delays
    const stepDuration = 2000; // 2 seconds per step
    
    deploymentSteps.forEach((step, index) => {
      setTimeout(() => {
        setDeploymentSteps(steps => steps.map(s => 
          s.id === step.id ? { ...s, status: 'active' } : s
        ));
      }, index * stepDuration);
      
      setTimeout(() => {
        setDeploymentSteps(steps => steps.map(s => 
          s.id === step.id ? { ...s, status: 'completed' } : s
        ));
        
        if (index === deploymentSteps.length - 1) {
          setCrewWorkflowStatus('completed');
        }
      }, (index * stepDuration) + (stepDuration - 500));
    });
  };

  const handleStartRouteDeployment = () => {
    setRouteWorkflowStatus('in_progress');
    setShowRouteProgressDetail(true);
    
    // Reset all steps to pending
    setRouteSteps(steps => steps.map(step => ({ ...step, status: 'pending' })));
    
    // Process each step with delays
    const stepDuration = 2000; // 2 seconds per step
    
    routeSteps.forEach((step, index) => {
      setTimeout(() => {
        setRouteSteps(steps => steps.map(s => 
          s.id === step.id ? { ...s, status: 'active' } : s
        ));
      }, index * stepDuration);
      
      setTimeout(() => {
        setRouteSteps(steps => steps.map(s => 
          s.id === step.id ? { ...s, status: 'completed' } : s
        ));
        
        if (index === routeSteps.length - 1) {
          setRouteWorkflowStatus('completed');
          // After completion, show the workflow modal with results
          setTimeout(() => {
            setShowRouteProgressDetail(false);
            setShowRouteWorkflowModal(true);
          }, 1000);
        }
      }, (index * stepDuration) + (stepDuration - 500));
    });
  };

  return (
    <div className="flights-module">
      <div className="flight-controls">
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search flights by ID, origin, or destination..."
            className="flight-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="view-tabs">
          <button 
            className={`view-tab ${activeView === 'all' ? 'active' : ''}`}
            onClick={() => setActiveView('all')}
          >
            All Flights
          </button>
          <button 
            className={`view-tab ${activeView === 'active' ? 'active' : ''}`}
            onClick={() => setActiveView('active')}
          >
            Active
          </button>
          <button 
            className={`view-tab ${activeView === 'delayed' ? 'active' : ''}`}
            onClick={() => setActiveView('delayed')}
          >
            Delayed
          </button>
          <button 
            className={`view-tab ${activeView === 'highRisk' ? 'active' : ''}`}
            onClick={() => setActiveView('highRisk')}
          >
            High Risk
          </button>
        </div>
      </div>

      {currentFlights.length === 0 ? (
        <div className="no-flights">
          <PlaneTakeoff size={24} />
          <p>No flights match your search criteria</p>
        </div>
      ) : (
        <div className="flight-cards-container">
          {currentFlights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-card-header">
                <div className="flight-id">{flight.id}</div>
                {getRiskBadge(flight.risk)}
              </div>
              
              <div className="flight-route">
                <div className="origin">
                  <div className="airport-code">{flight.origin}</div>
                  <div className="airport-name">{flight.originFull}</div>
                </div>
                <div className="route-line">
                  <div className="route-dot"></div>
                  <div className="route-arrow">
                    <ArrowRight size={16} />
                  </div>
                  <div className="route-dot"></div>
                </div>
                <div className="destination">
                  <div className="airport-code">{flight.destination}</div>
                  <div className="airport-name">{flight.destinationFull}</div>
                </div>
              </div>
              
              <div className="flight-details">
                <div className="flight-detail">
                  <div className="detail-label">Status</div>
                  <div className="detail-value">{getStatusIndicator(flight.status)}</div>
                </div>
                <div className="flight-detail">
                  <div className="detail-label">Departure</div>
                  <div className="detail-value">{flight.scheduledDeparture}</div>
                </div>
                <div className="flight-detail">
                  <div className="detail-label">Arrival</div>
                  <div className="detail-value">{flight.scheduledArrival}</div>
                </div>
              </div>
              
              <div className="flight-footer">
                <div className="flight-detail">
                  <div className="detail-label">Aircraft</div>
                  <div className="detail-value">{flight.aircraft}</div>
                </div>
                <div className="flight-detail">
                  <div className="detail-label">Gate</div>
                  <div className="detail-value">{flight.gate}</div>
                </div>
                <div className="flight-actions">
                  <button 
                    className="flight-details-btn"
                    onClick={() => handleViewDetails(flight)}
                  >
                    View Details
                  </button>
                  <button 
                    className="flight-simulation-btn"
                    onClick={() => handleViewSimulation(flight)}
                  >
                    <Activity size={14} />
                    Simulate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flight Details Modal */}
      {showDetailModal && selectedFlight && (
        <div className="flight-detail-modal-backdrop">
          <div className="flight-detail-modal">
            <div className="modal-header">
              <div className="modal-title">
                <PlaneTakeoff size={20} />
                <h3>Flight {selectedFlight.id} Details</h3>
              </div>
              <button className="modal-close-btn" onClick={closeDetailModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              {/* Flight Path Visualization */}
              <div className="flight-path-visualization">
                <div className="visualization-header">
                  <div className="origin">
                    <div className="airport-code">{selectedFlight.origin}</div>
                    <div className="airport-name">{selectedFlight.originFull}</div>
                  </div>
                  <div className="flight-status">
                    {getStatusIndicator(selectedFlight.status)}
                  </div>
                  <div className="destination">
                    <div className="airport-code">{selectedFlight.destination}</div>
                    <div className="airport-name">{selectedFlight.destinationFull}</div>
                  </div>
                </div>
                
                {/* Progress Indicator */}
                {(() => {
                  const pathData = getFlightPathData(selectedFlight);
                  return (
                    <div className="flight-progress-container">
                      <div className="flight-progress-track">
                        <div 
                          className="flight-progress-indicator" 
                          style={{width: `${pathData.progress}%`}}
                        >
                          <div className="plane-icon-container">
                            <PlaneTakeoff size={16} className="plane-icon" />
                          </div>
                        </div>
                      </div>
                      <div className="flight-progress-labels">
                        <div className="progress-label">
                          {pathData.elapsedTime} min elapsed
                        </div>
                        <div className="progress-label">
                          {pathData.remainingTime} min remaining
                        </div>
                      </div>
                      <div className="flight-metrics">
                        <div className="metric">
                          <div className="metric-label">Ground Speed</div>
                          <div className="metric-value">{pathData.groundSpeed}</div>
                        </div>
                        <div className="metric">
                          <div className="metric-label">Altitude</div>
                          <div className="metric-value">{pathData.altitude}</div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="detail-columns">
                {/* Flight Information Column */}
                <div className="detail-column">
                  <h4 className="detail-column-title">Flight Information</h4>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-item-label">Aircraft Type</div>
                      <div className="detail-item-value">{selectedFlight.aircraft}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-item-label">Registration</div>
                      <div className="detail-item-value">{selectedFlight.registration || "N7846B"}</div>
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-item-label">Scheduled Departure</div>
                      <div className="detail-item-value">{selectedFlight.scheduledDeparture}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-item-label">Estimated Arrival</div>
                      <div className="detail-item-value">{selectedFlight.scheduledArrival}</div>
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-item-label">Departure Gate</div>
                      <div className="detail-item-value">{selectedFlight.gate || "A12"}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-item-label">Arrival Gate</div>
                      <div className="detail-item-value">{selectedFlight.arrivalGate || "B22"}</div>
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-item-label">Risk Assessment</div>
                      <div className="detail-item-value">{getRiskBadge(selectedFlight.risk)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-item-label">Distance</div>
                      <div className="detail-item-value">{selectedFlight.distance || "1,432 NM"}</div>
                    </div>
                  </div>
                </div>
                
                {/* Weather Information Column */}
                <div className="detail-column">
                  <h4 className="detail-column-title">Route Weather Conditions</h4>
                  
                  {(() => {
                    const weatherData = getWeatherData(selectedFlight);
                    return (
                      <>
                        <div className="detail-row">
                          <div className="detail-item">
                            <div className="weather-item">
                              <Wind size={16} />
                              <div>
                                <div className="detail-item-label">Wind Speed</div>
                                <div className="detail-item-value">{weatherData.windSpeed}</div>
                              </div>
                            </div>
                          </div>
                          <div className="detail-item">
                            <div className="weather-item">
                              <Thermometer size={16} />
                              <div>
                                <div className="detail-item-label">Temperature</div>
                                <div className="detail-item-value">{weatherData.temperature}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="detail-row">
                          <div className="detail-item">
                            <div className="weather-item">
                              <Droplets size={16} />
                              <div>
                                <div className="detail-item-label">Humidity</div>
                                <div className="detail-item-value">{weatherData.humidity}</div>
                              </div>
                            </div>
                          </div>
                          <div className="detail-item">
                            <div className="weather-item">
                              <Cloud size={16} />
                              <div>
                                <div className="detail-item-label">Visibility</div>
                                <div className="detail-item-value">{weatherData.visibility}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
              
              {/* AI-Assisted Recommendations */}
              <div className="ai-recommendation-section">
                <div className="ai-recommendation-header">
                  <div className="ai-icon">
                    <Cpu size={20} />
                  </div>
                  <h4>AI-Assisted Flight Recommendations</h4>
                </div>
                
                <div className="ai-recommendation-content">
                  {aiProcessing ? (
                    <div className="ai-processing">
                      <div className="ai-processing-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <p>AI analyzing flight patterns and environmental factors...</p>
                    </div>
                  ) : (
                    <div className="ai-message">
                      <p>{aiRecommendation}</p>
                    </div>
                  )}
                </div>
                
                <div className="ai-actions">
                  <button className="action-btn">Apply Recommendation</button>
                  <button className="action-btn">Request Alternative</button>
                  <button className="action-btn">Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Pagination */}
      {filteredFlights.length > flightsPerPage && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="pagination-btn"
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Simulation Modal */}
      {showSimulationModal && selectedSimulation && (
        <div className="simulation-modal-backdrop">
          <div className="simulation-modal">
            <div className="modal-header">
              <div className="modal-title">
                <Activity size={20} />
                <h3>Decision Simulation - Flight {selectedSimulation.id}</h3>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => {
                  setShowSimulationModal(false);
                  setSimulationProgress(0);
                  setSimulationResults(null);
                  setSimulationRunning(false);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              <div className="simulation-controls">
                <div className="simulation-variables">
                  <h4>Simulation Variables</h4>
                  <div className="variables-grid">
                    <div className="variable-item">
                      <label>Weather Conditions</label>
                      <select 
                        value={selectedVariables.weather}
                        onChange={(e) => setSelectedVariables(prev => ({...prev, weather: e.target.value}))}
                        disabled={simulationRunning}
                      >
                        <option value="current">Current Forecast</option>
                        <option value="adverse">Adverse Weather</option>
                        <option value="optimal">Optimal Conditions</option>
                      </select>
                    </div>
                    <div className="variable-item">
                      <label>Air Traffic Density</label>
                      <select
                        value={selectedVariables.traffic}
                        onChange={(e) => setSelectedVariables(prev => ({...prev, traffic: e.target.value}))}
                        disabled={simulationRunning}
                      >
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div className="variable-item">
                      <label>Fuel Price Scenario</label>
                      <select
                        value={selectedVariables.fuelPrice}
                        onChange={(e) => setSelectedVariables(prev => ({...prev, fuelPrice: e.target.value}))}
                        disabled={simulationRunning}
                      >
                        <option value="current">Current Market</option>
                        <option value="high">Price Surge</option>
                        <option value="low">Price Drop</option>
                      </select>
                    </div>
                    <div className="variable-item">
                      <label>Crew Availability</label>
                      <select
                        value={selectedVariables.crewAvailability}
                        onChange={(e) => setSelectedVariables(prev => ({...prev, crewAvailability: e.target.value}))}
                        disabled={simulationRunning}
                      >
                        <option value="normal">Normal</option>
                        <option value="limited">Limited</option>
                        <option value="optimal">Optimal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="simulation-actions">
                  {!simulationRunning && simulationProgress === 0 && (
                    <button className="run-simulation-btn" onClick={runSimulation}>
                      <Play size={16} />
                      Run Simulation
                    </button>
                  )}
                  {simulationRunning && (
                    <button className="pause-simulation-btn" onClick={() => setSimulationRunning(false)}>
                      <Pause size={16} />
                      Pause
                    </button>
                  )}
                  {!simulationRunning && simulationProgress > 0 && (
                    <button className="reset-simulation-btn" onClick={resetSimulation}>
                      <RotateCcw size={16} />
                      Reset
                    </button>
                  )}
                </div>

                {(simulationRunning || simulationProgress > 0) && (
                  <div className="simulation-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-indicator"
                        style={{ width: `${simulationProgress}%` }}
                      ></div>
                    </div>
                    <div className="progress-label">
                      {simulationProgress < 100 
                        ? `Processing Scenarios... ${simulationProgress}%`
                        : 'Simulation Complete'}
                    </div>
                  </div>
                )}
              </div>

              {simulationResults && simulationResults.length > 0 && (
                <div className="simulation-results">
                  <h4>Scenario Analysis</h4>
                  <div className="scenarios-list">
                    {simulationResults.map((scenario) => (
                      <div key={scenario.id} className="scenario-card">
                        <div 
                          className="scenario-header"
                          onClick={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
                        >
                          <div className="scenario-title">
                            <h5>{scenario.scenario}</h5>
                            <div className="scenario-meta">
                              <span className="probability">
                                {scenario.probability}% Probability
                              </span>
                              <span className={`impact impact-${scenario.impact.toLowerCase()}`}>
                                {scenario.impact} Impact
                              </span>
                            </div>
                          </div>
                          <button className="expand-btn">
                            {expandedScenario === scenario.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        
                        {expandedScenario === scenario.id && (
                          <div className="scenario-details">
                            <p className="scenario-description">{scenario.description}</p>
                            
                            <div className="outcome-metrics">
                              <div className="metric">
                                <div className="metric-icon">
                                  <Activity className="w-5 h-5" style={{ color: '#4361ee' }} />
                                </div>
                                <div className="metric-value">{scenario.outcomes.fuelSavings}%</div>
                                <div className="metric-label">Fuel Savings</div>
                              </div>
                              <div className="metric">
                                <div className="metric-icon">
                                  <DollarSign className="w-5 h-5" style={{ color: '#2ecc71' }} />
                                </div>
                                <div className="metric-value">${scenario.outcomes.costSavings}</div>
                                <div className="metric-label">Cost Savings</div>
                              </div>
                              <div className="metric">
                                <div className="metric-icon">
                                  <Timer className="w-5 h-5" style={{ color: '#7209b7' }} />
                                </div>
                                <div className="metric-value">{scenario.outcomes.timeReduction}</div>
                                <div className="metric-label">Time Reduction</div>
                              </div>
                              <div className="metric">
                                <div className="metric-icon">
                                  <Shield className="w-5 h-5" style={{ color: '#e63946' }} />
                                </div>
                                <div className="metric-value">{getRiskBadge(scenario.impact)}</div>
                                <div className="metric-label">Risk</div>
                              </div>
                              <div className="metric">
                                <div className="metric-icon">
                                  <Leaf className="w-5 h-5" style={{ color: '#06d6a0' }} />
                                </div>
                                <div className="metric-value">{scenario.outcomes.additionalMetrics.co2Reduction}</div>
                                <div className="metric-label">CO2 Reduction</div>
                              </div>
                              <div className="metric">
                                <div className="metric-icon">
                                  <Smile className="w-5 h-5" style={{ color: '#ffd60a' }} />
                                </div>
                                <div className="metric-value">{scenario.outcomes.additionalMetrics.passengerSatisfaction}%</div>
                                <div className="metric-label">Passenger Satisfaction</div>
                              </div>
                            </div>

                            <div className="additional-metrics">
                              <h6>Additional Metrics</h6>
                              <div className="metrics-grid">
                                {Object.entries(scenario.outcomes.additionalMetrics).map(([key, value]) => (
                                  <div key={key} className="metric-item">
                                    <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                                    <span className="value">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="visualization-preview">
                              <h6>Visualization Preview</h6>
                              <div className="visualization-content">
                                {scenario.outcomes.visualization.type === "route" && (
                                  <div className="route-visualization">
                                    <div className="route-path current">
                                      <span>Current Path:</span>
                                      <div className="path-points">
                                        {scenario.outcomes.visualization.data.currentPath.map((point, index) => (
                                          <span key={index} className="point">{point}</span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="route-path optimized">
                                      <span>Optimized Path:</span>
                                      <div className="path-points">
                                        {scenario.outcomes.visualization.data.optimizedPath.map((point, index) => (
                                          <span key={index} className="point">{point}</span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {scenario.outcomes.visualization.type === "weather" && (
                                  <div className="weather-visualization">
                                    <div className="weather-conditions current">
                                      <span>Current Conditions:</span>
                                      <div className="conditions-list">
                                        {scenario.outcomes.visualization.data.currentConditions.map((condition, index) => (
                                          <span key={index} className="condition">{condition}</span>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="weather-conditions optimized">
                                      <span>Optimized Conditions:</span>
                                      <div className="conditions-list">
                                        {scenario.outcomes.visualization.data.optimizedConditions.map((condition, index) => (
                                          <span key={index} className="condition">{condition}</span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {scenario.outcomes.visualization.type === "fuel" && (
                                  <div className="fuel-visualization">
                                    <div className="fuel-comparison">
                                      <div className="fuel-type current">
                                        <span>Current Consumption</span>
                                        <div className="fuel-bar">
                                          <div className="bar-fill" style={{ width: '100%' }}></div>
                                        </div>
                                      </div>
                                      <div className="fuel-type optimized">
                                        <span>Optimized Consumption</span>
                                        <div className="fuel-bar">
                                          <div className="bar-fill" style={{ width: `${100 - scenario.outcomes.visualization.data.savings}%` }}></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {scenario.outcomes.visualization.type === "crew" && (
                                  <div className="crew-visualization">
                                    <div className="schedule-comparison">
                                      <div className="schedule current">
                                        <span>Current Schedule</span>
                                        <div className="schedule-items">
                                          {scenario.outcomes.visualization.data.currentSchedule.map((item, index) => (
                                            <span key={index} className="schedule-item">{item}</span>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="schedule optimized">
                                        <span>Optimized Schedule</span>
                                        <div className="schedule-items">
                                          {scenario.outcomes.visualization.data.optimizedSchedule.map((item, index) => (
                                            <span key={index} className="schedule-item">{item}</span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="scenario-actions">
                              <button 
                                className="apply-scenario-btn"
                                onClick={() => {
                                  console.log('Scenario clicked:', scenario); // Debug log
                                  handleApplyScenario(scenario);
                                }}
                              >
                                Apply This Scenario
                              </button>
                              <button className="modify-scenario-btn">
                                <Settings size={14} />
                                Modify Parameters
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCrewWorkflowModal && selectedCrewScenario && (
        <div className="crew-workflow-modal-backdrop">
          <div className="crew-workflow-modal">
            <div className="modal-header">
              <div className="modal-title">
                <Users size={20} />
                <h3>Crew Resource Management Workflow</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setShowCrewWorkflowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              <div className="workflow-status">
                <div className="status-header">
                  <h4>Workflow Status</h4>
                  <div className={`status-badge ${crewWorkflowStatus}`}>
                    {crewWorkflowStatus === 'initializing' && 'Initializing Workflow'}
                    {crewWorkflowStatus === 'in_progress' && 'In Progress'}
                    {crewWorkflowStatus === 'completed' && 'Completed'}
                  </div>
                </div>

                <div className="workflow-steps">
                  <div className={`workflow-step ${crewWorkflowStatus === 'initializing' ? 'active' : ''}`}>
                    <div className="step-icon">
                      <Users size={16} />
                    </div>
                    <div className="step-content">
                      <h5>Ground Staff Deployment</h5>
                      <p>Assigning available ground crew to optimal positions</p>
                    </div>
                  </div>

                  <div className={`workflow-step ${crewWorkflowStatus === 'in_progress' ? 'active' : ''}`}>
                    <div className="step-icon">
                      <MapPin size={16} />
                    </div>
                    <div className="step-content">
                      <h5>Gate Management</h5>
                      <p>Optimizing gate assignments for efficient turnaround</p>
                    </div>
                  </div>

                  <div className={`workflow-step ${crewWorkflowStatus === 'completed' ? 'active' : ''}`}>
                    <div className="step-icon">
                      <CheckCircle size={16} />
                    </div>
                    <div className="step-content">
                      <h5>Resource Allocation</h5>
                      <p>Finalizing crew schedules and equipment distribution</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="resource-allocation">
                <h4>Available Resources</h4>
                <div className="resource-grid">
                  <div className="resource-card">
                    <div className="resource-icon">
                      <Users size={20} />
                    </div>
                    <div className="resource-details">
                      <h5>Ground Staff</h5>
                      <p>12 Available</p>
                    </div>
                  </div>
                  <div className="resource-card">
                    <div className="resource-icon">
                      <MapPin size={20} />
                    </div>
                    <div className="resource-details">
                      <h5>Gates</h5>
                      <p>5 Available</p>
                    </div>
                  </div>
                  <div className="resource-card">
                    <div className="resource-icon">
                      <Settings size={20} />
                    </div>
                    <div className="resource-details">
                      <h5>Equipment</h5>
                      <p>8 Units Available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="workflow-actions">
                <button 
                  className="action-btn primary"
                  onClick={handleStartDeployment}
                  disabled={crewWorkflowStatus !== 'initializing'}
                >
                  <Play size={16} />
                  Start Deployment
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => setShowCrewWorkflowModal(false)}
                >
                  Cancel
                </button>
              </div>

              {crewWorkflowStatus !== 'initializing' && (
                <div className="deployment-progress">
                  {deploymentSteps.map((step) => (
                    <div 
                      key={step.id} 
                      className={`progress-step ${
                        step.status === 'active' ? 'active' : 
                        step.status === 'completed' ? 'completed' : ''
                      }`}
                    >
                      <div className="step-indicator">
                        {step.status === 'completed' ? (
                          <CheckCircle size={14} />
                        ) : step.status === 'active' ? (
                          <Activity size={14} />
                        ) : (
                          <span>{step.id}</span>
                        )}
                      </div>
                      <div className="progress-step-content">
                        <div className="progress-step-title">
                          {step.title}
                          {step.status === 'active' && (
                            <span className="loading-dots">
                              <span></span>
                              <span></span>
                              <span></span>
                            </span>
                          )}
                        </div>
                        <div className="progress-step-description">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showRouteWorkflowModal && selectedRouteScenario && (
        <div className="route-workflow-modal-backdrop">
          <div className="route-workflow-modal">
            <div className="modal-header">
              <div className="modal-title">
                <Navigation size={20} />
                <h3>LIDO Route Optimization Workflow</h3>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => {
                  setShowRouteWorkflowModal(false);
                  setRouteWorkflowStatus('initializing');
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              {routeWorkflowStatus === 'completed' ? (
                <div className="completion-details">
                  <div className="completion-header">
                    <div className="completion-icon">
                      <CheckCircle size={32} className="text-green-500" />
                      <div className="completion-glow"></div>
                    </div>
                    <h4>Route Optimization Completed Successfully</h4>
                    <p className="completion-subtitle">LIDO has successfully optimized your flight route</p>
                  </div>
                  
                  <div className="scenario-results">
                    <h5>Applied Scenario Details</h5>
                    <div className="result-grid">
                      <div className="result-card route-card">
                        <div className="result-icon">
                          <Navigation size={24} className="text-blue-500" />
                          <div className="icon-glow blue"></div>
                        </div>
                        <div className="result-content">
                          <h6>Optimized Route</h6>
                          <p className="route-path">
                            {selectedRouteScenario.outcomes.visualization.data.optimizedPath.map((point, index) => (
                              <span key={index} className="route-point">
                                {point}
                                {index < selectedRouteScenario.outcomes.visualization.data.optimizedPath.length - 1 && (
                                  <ArrowRight size={16} className="text-blue-300" />
                                )}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                      
                      <div className="result-card fuel-card">
                        <div className="result-icon">
                          <Fuel size={24} className="text-amber-500" />
                          <div className="icon-glow amber"></div>
                        </div>
                        <div className="result-content">
                          <h6>Fuel Savings</h6>
                          <p className="result-value">{selectedRouteScenario.outcomes.fuelSavings}</p>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: selectedRouteScenario.outcomes.fuelSavings }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="result-card time-card">
                        <div className="result-icon">
                          <Timer size={24} className="text-purple-500" />
                          <div className="icon-glow purple"></div>
                        </div>
                        <div className="result-content">
                          <h6>Time Reduction</h6>
                          <p className="result-value">{selectedRouteScenario.outcomes.timeReduction}</p>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="result-card cost-card">
                        <div className="result-icon">
                          <DollarSign size={24} className="text-green-500" />
                          <div className="icon-glow green"></div>
                        </div>
                        <div className="result-content">
                          <h6>Cost Savings</h6>
                          <p className="result-value">{selectedRouteScenario.outcomes.costSavings}</p>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '100%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="additional-metrics">
                      <h6>Additional Metrics</h6>
                      <div className="metrics-grid">
                        <div className="metric-item co2-metric">
                          <div className="metric-icon">
                            <Leaf size={20} className="text-emerald-500" />
                          </div>
                          <div className="metric-content">
                            <span className="metric-label">CO2 Reduction</span>
                            <span className="metric-value">{selectedRouteScenario.outcomes.additionalMetrics.co2Reduction}</span>
                          </div>
                        </div>
                        <div className="metric-item satisfaction-metric">
                          <div className="metric-icon">
                            <Smile size={20} className="text-yellow-500" />
                          </div>
                          <div className="metric-content">
                            <span className="metric-label">Passenger Satisfaction</span>
                            <span className="metric-value">{selectedRouteScenario.outcomes.additionalMetrics.passengerSatisfaction}</span>
                          </div>
                        </div>
                        <div className="metric-item efficiency-metric">
                          <div className="metric-icon">
                            <Gauge size={20} className="text-blue-500" />
                          </div>
                          <div className="metric-content">
                            <span className="metric-label">Operational Efficiency</span>
                            <span className="metric-value">{selectedRouteScenario.outcomes.additionalMetrics.operationalEfficiency}</span>
                          </div>
                        </div>
                        <div className="metric-item optimization-metric">
                          <div className="metric-icon">
                            <Target size={20} className="text-red-500" />
                          </div>
                          <div className="metric-content">
                            <span className="metric-label">Route Optimization</span>
                            <span className="metric-value">{selectedRouteScenario.outcomes.additionalMetrics.routeOptimization}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="completion-actions">
                    <button 
                      className="action-btn primary"
                      onClick={() => {
                        setShowRouteWorkflowModal(false);
                        setRouteWorkflowStatus('initializing');
                      }}
                    >
                      <CheckCircle size={16} />
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="workflow-status">
                    <div className="status-header">
                      <h4>LIDO Route Optimization Status</h4>
                      <div className={`status-badge ${routeWorkflowStatus}`}>
                        {routeWorkflowStatus === 'initializing' && 'Initializing LIDO'}
                        {routeWorkflowStatus === 'in_progress' && 'In Progress'}
                        {routeWorkflowStatus === 'completed' && 'Completed'}
                      </div>
                    </div>

                    <div className="workflow-steps">
                      {routeSteps.map((step) => (
                        <div 
                          key={step.id}
                          className={`workflow-step ${
                            step.status === 'active' ? 'active' : 
                            step.status === 'completed' ? 'completed' : ''
                          }`}
                        >
                          <div className="step-icon">
                            {step.status === 'completed' ? (
                              <CheckCircle size={16} />
                            ) : step.status === 'active' ? (
                              <Activity size={16} />
                            ) : (
                              <span>{step.id}</span>
                            )}
                          </div>
                          <div className="step-content">
                            <h5>{step.title}</h5>
                            <p>{step.description}</p>
                            {step.status === 'active' && (
                              <span className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="workflow-actions">
                    <button 
                      className="action-btn primary"
                      onClick={handleStartRouteDeployment}
                      disabled={routeWorkflowStatus !== 'initializing'}
                    >
                      <Play size={16} />
                      Start LIDO Optimization
                    </button>
                    <button 
                      className="action-btn secondary"
                      onClick={() => {
                        setShowRouteWorkflowModal(false);
                        setRouteWorkflowStatus('initializing');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showProgressDetail && (
        <div className="progress-detail-modal-backdrop">
          <div className="progress-detail-modal">
            <button 
              className="progress-detail-close"
              onClick={() => setShowProgressDetail(false)}
            >
              <X size={20} />
            </button>

            <div className="progress-visualization">
              <div className="progress-header">
                <h3 className="progress-title">Deployment Progress</h3>
                <div className={`status-badge ${crewWorkflowStatus}`}>
                  {crewWorkflowStatus === 'initializing' && 'Initializing'}
                  {crewWorkflowStatus === 'in_progress' && 'In Progress'}
                  {crewWorkflowStatus === 'completed' && 'Completed'}
                </div>
              </div>

              <div className="progress-stats">
                <div className="stat-card">
                  <div className="stat-header">
                    <Activity size={16} />
                    <span>Progress</span>
                  </div>
                  <div className="stat-value">
                    {Math.round((deploymentSteps.filter(s => s.status === 'completed').length / deploymentSteps.length) * 100)}%
                  </div>
                  <div className="stat-label">Overall Completion</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <Clock size={16} />
                    <span>Time</span>
                  </div>
                  <div className="stat-value">
                    {Math.round((deploymentSteps.filter(s => s.status === 'completed').length * 2))}s
                  </div>
                  <div className="stat-label">Elapsed Time</div>
                </div>
              </div>

              <div className="progress-timeline">
                <div className="timeline-line"></div>
                <div 
                  className="timeline-progress" 
                  style={{ 
                    height: `${(deploymentSteps.filter(s => s.status === 'completed').length / deploymentSteps.length) * 100}%` 
                  }}
                ></div>
                
                {deploymentSteps.map((step) => (
                  <div 
                    key={step.id}
                    className={`timeline-item ${
                      step.status === 'active' ? 'active' : 
                      step.status === 'completed' ? 'completed' : ''
                    }`}
                  >
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                      {step.status === 'active' && (
                        <span className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="resource-status">
              <div className="resource-status-card">
                <div className="resource-status-header">
                  <div className="resource-status-icon">
                    <Users size={20} />
                  </div>
                  <span className="resource-status-title">Ground Staff</span>
                </div>
                <div className="resource-status-value">12/15</div>
                <div className="resource-status-subtitle">Staff Members Deployed</div>
              </div>
              
              <div className="resource-status-card">
                <div className="resource-status-header">
                  <div className="resource-status-icon">
                    <MapPin size={20} />
                  </div>
                  <span className="resource-status-title">Gates</span>
                </div>
                <div className="resource-status-value">5/8</div>
                <div className="resource-status-subtitle">Gates Optimized</div>
              </div>
              
              <div className="resource-status-card">
                <div className="resource-status-header">
                  <div className="resource-status-icon">
                    <Settings size={20} />
                  </div>
                  <span className="resource-status-title">Equipment</span>
                </div>
                <div className="resource-status-value">8/10</div>
                <div className="resource-status-subtitle">Units Allocated</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRouteProgressDetail && (
        <div className="progress-detail-modal-backdrop">
          <div className="progress-detail-modal">
            <button 
              className="progress-detail-close"
              onClick={() => setShowRouteProgressDetail(false)}
            >
              <X size={20} />
            </button>

            <div className="progress-visualization">
              <div className="progress-header">
                <h3 className="progress-title">Route Optimization Progress</h3>
                <div className={`status-badge ${routeWorkflowStatus}`}>
                  {routeWorkflowStatus === 'initializing' && 'Initializing'}
                  {routeWorkflowStatus === 'in_progress' && 'In Progress'}
                  {routeWorkflowStatus === 'completed' && 'Completed'}
                </div>
              </div>

              <div className="progress-stats">
                <div className="stat-card">
                  <div className="stat-header">
                    <Activity size={16} />
                    <span>Progress</span>
                  </div>
                  <div className="stat-value">
                    {Math.round((routeSteps.filter(s => s.status === 'completed').length / routeSteps.length) * 100)}%
                  </div>
                  <div className="stat-label">Overall Completion</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <Clock size={16} />
                    <span>Time</span>
                  </div>
                  <div className="stat-value">
                    {Math.round((routeSteps.filter(s => s.status === 'completed').length * 2))}s
                  </div>
                  <div className="stat-label">Elapsed Time</div>
                </div>
              </div>

              <div className="progress-timeline">
                <div className="timeline-line"></div>
                <div 
                  className="timeline-progress" 
                  style={{ 
                    height: `${(routeSteps.filter(s => s.status === 'completed').length / routeSteps.length) * 100}%` 
                  }}
                ></div>
                
                {routeSteps.map((step) => (
                  <div 
                    key={step.id}
                    className={`timeline-item ${
                      step.status === 'active' ? 'active' : 
                      step.status === 'completed' ? 'completed' : ''
                    }`}
                  >
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                      {step.status === 'active' && (
                        <span className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="resource-status">
              <div className="resource-status-card">
                <div className="resource-status-header">
                  <div className="resource-status-icon">
                    <Navigation size={20} />
                  </div>
                  <span className="resource-status-title">Route Analysis</span>
                </div>
                <div className="resource-status-value">
                  {Math.round((routeSteps.filter(s => s.status === 'completed').length / routeSteps.length) * 100)}%
                </div>
                <div className="resource-status-subtitle">Route Optimization Complete</div>
              </div>
              
              <div className="resource-status-card">
                <div className="resource-status-header">
                  <div className="resource-status-icon">
                    <CloudSun size={20} />
                  </div>
                  <span className="resource-status-title">Weather Assessment</span>
                </div>
                <div className="resource-status-value">
                  {Math.round((routeSteps.filter(s => s.status === 'completed').length / routeSteps.length) * 100)}%
                </div>
                <div className="resource-status-subtitle">Weather Analysis Complete</div>
              </div>
              
              <div className="resource-status-card">
                <div className="resource-status-header">
                  <div className="resource-status-icon">
                    <PlaneTakeoff size={20} />
                  </div>
                  <span className="resource-status-title">Flight Plan</span>
                </div>
                <div className="resource-status-value">
                  {Math.round((routeSteps.filter(s => s.status === 'completed').length / routeSteps.length) * 100)}%
                </div>
                <div className="resource-status-subtitle">Flight Plan Updated</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightsTable; 