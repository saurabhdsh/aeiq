import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  CircularProgress,
  Alert,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Timeline, 
  TimelineItem, 
  TimelineSeparator, 
  TimelineConnector, 
  TimelineContent, 
  TimelineDot 
} from '@mui/lab';
import { 
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Warning as WarningIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Person as PersonIcon,
  FlightTakeoff as FlightTakeoffIcon,
  FlightLand as FlightLandIcon,
  Work as WorkIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  CloudSync as CloudSyncIcon,
  CloudDone as CloudDoneIcon,
  CloudOff as CloudOffIcon,
  AirplanemodeActive as AirplanemodeActiveIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Assignment as AssignmentIcon,
  Verified as VerifiedIcon,
  Update as UpdateIcon,
  Send as SendIcon,
  AirportShuttle as AirportShuttleIcon,
  Luggage as LuggageIcon,
  CleaningServices as CleaningServicesIcon,
  LocalGasStation as FuelHandlerIcon,
  Build as DeicingIcon,
  People as PeopleIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  SwapHoriz as SwapHorizIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { mockCrewData, mockMissionData, mockAIService } from './mockData';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  borderRadius: '12px',
  overflow: 'hidden',
}));

const StyledTimelineDot = styled(TimelineDot)(({ theme, color }) => ({
  backgroundColor: theme.palette[color].main,
  boxShadow: `0 0 10px ${theme.palette[color].light}`,
  width: '24px',
  height: '24px',
}));

const RiskChip = styled(Chip)(({ theme, risklevel }) => ({
  backgroundColor: 
    risklevel === 'high' ? theme.palette.error.light :
    risklevel === 'medium' ? theme.palette.warning.light :
    theme.palette.success.light,
  color: theme.palette.getContrastText(
    risklevel === 'high' ? theme.palette.error.light :
    risklevel === 'medium' ? theme.palette.warning.light :
    theme.palette.success.light
  ),
  fontWeight: 'bold',
  padding: '4px 8px',
}));

const AnimatedCard = motion(StyledCard);

const DeploymentCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const CrewManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('fatigue');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCrew, setSelectedCrew] = useState(mockCrewData[0]);
  const [selectedMission, setSelectedMission] = useState(mockMissionData[0]);
  const [fatigueData, setFatigueData] = useState(null);
  const [matchingData, setMatchingData] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [cmsStatus, setCmsStatus] = useState('disconnected');
  const [crewSchedules, setCrewSchedules] = useState([]);
  const [selectedDeploymentPlan, setSelectedDeploymentPlan] = useState(null);
  const [deploymentPlans, setDeploymentPlans] = useState([]);
  const [showDeploymentDialog, setShowDeploymentDialog] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [showPlanDetails, setShowPlanDetails] = useState(false);

  const crewNames = [
    'James Wilson', 'Sarah Chen', 'Michael Rodriguez',    // Gate Operations
    'Emily Johnson', 'David Kim', 'Lisa Anderson',        // Baggage Handling
    'Robert Taylor', 'Jennifer Lee',                      // Security & Safety
    'William Brown', 'Maria Garcia',                      // Cleaning & Maintenance
    'Thomas White', 'Patricia Moore'                      // Fuel & De-icing
  ];

  const groundStaffRoles = [
    'Ramp Agent', 'Baggage Handler', 'Gate Agent',           // Gate Operations
    'Customer Service Agent', 'Operations Agent', 'Security Officer',  // Baggage Handling
    'Maintenance Technician', 'Catering Staff',              // Security & Safety
    'Cleaning Crew', 'Fuel Handler',                         // Cleaning & Maintenance
    'De-icing Technician', 'Fuel Handler'                    // Fuel & De-icing
  ];

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      switch (activeTab) {
        case 'fatigue':
          setFatigueData(mockAIService.predictFatigue(selectedCrew.id));
          break;
        case 'matching':
          setMatchingData(mockAIService.findBestMatches(selectedMission.id));
          break;
        case 'risk':
          setRiskData(mockAIService.calculateRisk(selectedCrew.id));
          break;
        case 'schedule':
          const schedule = mockAIService.generateSchedule();
          console.log('Generated schedule:', schedule);
          setScheduleData(schedule || []);
          break;
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const connectToSaberCMS = async () => {
    setCmsStatus('connecting');
    try {
      // Simulate API call to Saber CMS
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCmsStatus('connected');
      // Simulate fetching crew schedules with realistic names and roles
      const schedules = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: crewNames[i],
        role: groundStaffRoles[i],
        schedules: Array.from({ length: 5 }, (_, j) => ({
          date: new Date(Date.now() + (j + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          flights: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, k) => ({
            flightNumber: `FL${Math.floor(Math.random() * 1000)}`,
            departure: `${Math.floor(Math.random() * 24)}:00`,
            arrival: `${Math.floor(Math.random() * 24)}:00`,
            route: ['JFK-LHR', 'LAX-SYD', 'DXB-SIN', 'HKG-NRT'][Math.floor(Math.random() * 4)],
            criticality: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]
          }))
        }))
      }));
      setCrewSchedules(schedules);
    } catch (error) {
      setCmsStatus('disconnected');
      setError('Failed to connect to Saber CMS');
    }
  };

  const generateDeploymentPlans = () => {
    // Simulate AI generating deployment plans
    const plans = [
      {
        id: 1,
        name: 'Optimized Plan A',
        score: 0.92,
        description: 'Balanced workload with high efficiency',
        details: {
          crewUtilization: '85%',
          restPeriods: 'Optimal',
          criticalFlights: 'Fully covered'
        }
      },
      {
        id: 2,
        name: 'Safety-First Plan B',
        score: 0.88,
        description: 'Prioritizes crew rest and safety',
        details: {
          crewUtilization: '75%',
          restPeriods: 'Extended',
          criticalFlights: 'Fully covered'
        }
      },
      {
        id: 3,
        name: 'Efficiency Plan C',
        score: 0.95,
        description: 'Maximum operational efficiency',
        details: {
          crewUtilization: '90%',
          restPeriods: 'Standard',
          criticalFlights: 'Fully covered'
        }
      }
    ];
    setDeploymentPlans(plans);
    setShowDeploymentDialog(true);
  };

  const handlePlanSelection = (plan) => {
    setSelectedDeploymentPlan(plan);
    setShowPlanDetails(true);
  };

  const handleSubmitToCMS = async () => {
    setSubmissionStatus('connecting');
    try {
      // Simulate connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionStatus('updating');
      
      // Simulate plan update
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionStatus('submitting');
      
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionStatus('accepted');
      
      // Reset after showing success
      setTimeout(() => {
        setShowDeploymentDialog(false);
        setSubmissionStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmissionStatus('idle');
      setError('Failed to submit to Saber CMS');
    }
  };

  const renderSubmissionStatus = () => {
    const statusConfig = {
      connecting: {
        icon: <CloudSyncIcon />,
        color: 'warning.main',
        message: 'Connecting to Saber CMS...'
      },
      updating: {
        icon: <UpdateIcon />,
        color: 'info.main',
        message: 'Updating Deployment Plan...'
      },
      submitting: {
        icon: <SendIcon />,
        color: 'primary.main',
        message: 'Submitting Plan to CMS...'
      },
      accepted: {
        icon: <VerifiedIcon />,
        color: 'success.main',
        message: 'Plan Successfully Accepted!'
      }
    };

    if (submissionStatus === 'idle') return null;

    const config = statusConfig[submissionStatus];
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          animation: 'slideIn 0.5s ease-out'
        }}
      >
        <AnimatedCard
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardContent>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: config.color, mr: 2 }}>
                {config.icon}
              </Avatar>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {config.message}
              </Typography>
            </Box>
          </CardContent>
        </AnimatedCard>
      </Box>
    );
  };

  const renderPlanDetails = () => (
    <Dialog
      open={showPlanDetails}
      onClose={() => setShowPlanDetails(false)}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          overflow: 'auto'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <AssignmentIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {selectedDeploymentPlan?.name} - Detailed Deployment Plan
            </Typography>
          </Box>
          <Chip
            icon={<SpeedIcon />}
            label={`Score: ${(selectedDeploymentPlan?.score * 100).toFixed(1)}%`}
            color="primary"
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {/* Plan Overview */}
          <Grid item xs={12}>
            <DeploymentCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Plan Overview
                </Typography>
                <Typography variant="body2" paragraph>
                  {selectedDeploymentPlan?.description}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" alignItems="center" p={1.5} sx={{ bgcolor: 'rgba(25, 118, 210, 0.08)', borderRadius: 2 }}>
                      <TimerIcon sx={{ mr: 1, color: 'primary.main', fontSize: '1.2rem' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Utilization</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {selectedDeploymentPlan?.details.crewUtilization}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" alignItems="center" p={1.5} sx={{ bgcolor: 'rgba(46, 125, 50, 0.08)', borderRadius: 2 }}>
                      <SecurityIcon sx={{ mr: 1, color: 'success.main', fontSize: '1.2rem' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Rest Periods</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {selectedDeploymentPlan?.details.restPeriods}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" alignItems="center" p={1.5} sx={{ bgcolor: 'rgba(211, 47, 47, 0.08)', borderRadius: 2 }}>
                      <AirplanemodeActiveIcon sx={{ mr: 1, color: 'error.main', fontSize: '1.2rem' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Critical Coverage</Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {selectedDeploymentPlan?.details.criticalFlights}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </DeploymentCard>
          </Grid>

          {/* Deployment Breakdown */}
          <Grid item xs={12}>
            <DeploymentCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Deployment Breakdown
                </Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      title: 'Gate Operations',
                      icon: <AirportShuttleIcon />,
                      color: 'primary.main',
                      crew: crewSchedules.slice(0, 3),
                      description: 'Managing passenger boarding and aircraft docking'
                    },
                    {
                      title: 'Baggage Handling',
                      icon: <LuggageIcon />,
                      color: 'info.main',
                      crew: crewSchedules.slice(3, 6),
                      description: 'Loading and unloading passenger luggage'
                    },
                    {
                      title: 'Security & Safety',
                      icon: <SecurityIcon />,
                      color: 'warning.main',
                      crew: crewSchedules.slice(6, 8),
                      description: 'Ensuring airport security and safety protocols'
                    },
                    {
                      title: 'Cleaning & Maintenance',
                      icon: <CleaningServicesIcon />,
                      color: 'success.main',
                      crew: crewSchedules.slice(8, 10),
                      description: 'Aircraft cleaning and maintenance operations'
                    },
                    {
                      title: 'Fuel & De-icing',
                      icon: <FuelHandlerIcon />,
                      color: 'error.main',
                      crew: [
                        {
                          id: 11,
                          name: 'Thomas White',
                          role: 'De-icing Technician'
                        },
                        {
                          id: 12,
                          name: 'Patricia Moore',
                          role: 'Fuel Handler'
                        }
                      ],
                      description: 'Aircraft fueling and de-icing operations'
                    }
                  ].map((section, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: 'background.paper',
                          boxShadow: 1,
                          height: '100%'
                        }}
                      >
                        <Box display="flex" alignItems="center" mb={1.5}>
                          <Avatar sx={{ bgcolor: section.color, mr: 1.5, width: 32, height: 32 }}>
                            {section.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              {section.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {section.description}
                            </Typography>
                          </Box>
                        </Box>
                        <List dense>
                          {section.crew.map((member) => (
                            <ListItem 
                              key={member.id} 
                              sx={{ 
                                py: 0.5,
                                pr: 16,
                                '& .MuiListItemSecondaryAction-root': {
                                  right: 8,
                                  width: '140px',
                                  display: 'flex',
                                  justifyContent: 'flex-end'
                                },
                                '& .MuiListItemText-root': {
                                  mr: 12
                                }
                              }}
                            >
                              <ListItemAvatar sx={{ minWidth: 32 }}>
                                <Avatar sx={{ width: 28, height: 28 }}>
                                  <PersonIcon fontSize="small" />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: 'calc(100% - 140px)'
                                    }}
                                  >
                                    {member.name}
                                  </Typography>
                                }
                                secondary={
                                  <Typography 
                                    variant="caption" 
                                    color="text.secondary"
                                    sx={{ 
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      maxWidth: 'calc(100% - 140px)'
                                    }}
                                  >
                                    {member.role}
                                  </Typography>
                                }
                              />
                              <ListItemSecondaryAction>
                                <Box 
                                  display="flex" 
                                  alignItems="center" 
                                  sx={{ 
                                    gap: 0.5,
                                    position: 'absolute',
                                    right: 8
                                  }}
                                >
                                  <Chip
                                    icon={<ScheduleIcon sx={{ fontSize: '0.8rem' }} />}
                                    label="Scheduled"
                                    color="success"
                                    size="small"
                                    sx={{ 
                                      height: 24,
                                      minWidth: 'auto'
                                    }}
                                  />
                                  <IconButton 
                                    size="small" 
                                    color="primary" 
                                    sx={{ 
                                      p: 0.5,
                                      ml: 0.5
                                    }}
                                  >
                                    <SwapHorizIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </DeploymentCard>
          </Grid>

          {/* Schedule Impact */}
          <Grid item xs={12}>
            <DeploymentCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Schedule Impact Analysis
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={4}>
                    <Box p={1.5} sx={{ bgcolor: 'rgba(25, 118, 210, 0.08)', borderRadius: 2 }}>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <TrendingUpIcon sx={{ color: 'success.main', mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="caption" color="text.secondary">
                          Efficiency Improvement
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                        +15%
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box p={1.5} sx={{ bgcolor: 'rgba(46, 125, 50, 0.08)', borderRadius: 2 }}>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <TrendingDownIcon sx={{ color: 'error.main', mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="caption" color="text.secondary">
                          Downtime Reduction
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                        -20%
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box p={1.5} sx={{ bgcolor: 'rgba(255, 152, 0, 0.08)', borderRadius: 2 }}>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <PeopleIcon sx={{ color: 'warning.main', mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="caption" color="text.secondary">
                          Crew Satisfaction
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                        +25%
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </DeploymentCard>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button 
          onClick={() => setShowPlanDetails(false)}
          startIcon={<ArrowBackIcon />}
          size="small"
        >
          Back to Plans
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitToCMS}
          disabled={submissionStatus !== 'idle'}
          endIcon={<ArrowForwardIcon />}
          size="small"
        >
          Submit to Saber CMS
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderFatigueContent = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Crew Fatigue Analysis
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={() => loadData()}
        >
          Refresh Analysis
        </Button>
      </Box>

      {/* Saber CMS Connection Status */}
      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 3 }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Avatar 
                sx={{ 
                  bgcolor: cmsStatus === 'connected' ? 'success.main' : 
                          cmsStatus === 'connecting' ? 'warning.main' : 'error.main',
                  mr: 2
                }}
              >
                {cmsStatus === 'connected' ? <CloudDoneIcon /> :
                 cmsStatus === 'connecting' ? <CloudSyncIcon /> : <CloudOffIcon />}
              </Avatar>
              <Box>
                <Typography variant="h6">Saber CMS Connection</Typography>
                <Typography variant="body2" color="text.secondary">
                  {cmsStatus === 'connected' ? 'Connected and ready' :
                   cmsStatus === 'connecting' ? 'Connecting...' : 'Not connected'}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              color={cmsStatus === 'connected' ? 'success' : 'primary'}
              startIcon={<CloudSyncIcon />}
              onClick={connectToSaberCMS}
              disabled={cmsStatus === 'connecting'}
            >
              {cmsStatus === 'connected' ? 'Reconnect' : 'Connect to Saber CMS'}
            </Button>
          </Box>
        </CardContent>
      </AnimatedCard>

      {/* Crew Schedules */}
      {cmsStatus === 'connected' && (
        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{ mb: 3 }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Crew Schedules (Next 5 Days)</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AirplanemodeActiveIcon />}
                onClick={generateDeploymentPlans}
              >
                Generate Deployment Plans
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Crew Member</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Flights</TableCell>
                    <TableCell>Critical Flights</TableCell>
                    <TableCell>Total Hours</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {crewSchedules.map((crew) => (
                    <TableRow key={crew.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                          {crew.name}
                        </Box>
                      </TableCell>
                      <TableCell>{crew.role}</TableCell>
                      <TableCell>
                        {crew.schedules.reduce((total, day) => total + day.flights.length, 0)}
                      </TableCell>
                      <TableCell>
                        {crew.schedules.reduce((total, day) => 
                          total + day.flights.filter(f => f.criticality === 'High').length, 0
                        )}
                      </TableCell>
                      <TableCell>
                        {crew.schedules.reduce((total, day) => 
                          total + day.flights.reduce((sum, flight) => 
                            sum + (parseInt(flight.arrival) - parseInt(flight.departure)), 0
                          ), 0
                        )} hours
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </AnimatedCard>
      )}

      {/* Deployment Plans Dialog */}
      <Dialog 
        open={showDeploymentDialog} 
        onClose={() => setShowDeploymentDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <AirplanemodeActiveIcon sx={{ mr: 1, color: 'primary.main' }} />
            AI-Generated Deployment Plans
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {deploymentPlans.map((plan) => (
              <Grid item xs={12} md={4} key={plan.id}>
                <AnimatedCard
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handlePlanSelection(plan)}
                  sx={{
                    cursor: 'pointer',
                    border: selectedDeploymentPlan?.id === plan.id ? '2px solid' : 'none',
                    borderColor: 'primary.main'
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <SpeedIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {plan.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Score: {(plan.score * 100).toFixed(1)}%
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {plan.description}
                    </Typography>
                    <Box>
                      <Chip
                        icon={<TimerIcon />}
                        label={`Utilization: ${plan.details.crewUtilization}`}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip
                        icon={<SecurityIcon />}
                        label={`Rest: ${plan.details.restPeriods}`}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip
                        icon={<AirplanemodeActiveIcon />}
                        label={plan.details.criticalFlights}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </AnimatedCard>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeploymentDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedDeploymentPlan}
            onClick={() => {
              // Here you would implement the actual submission to Saber CMS
              setShowDeploymentDialog(false);
              // Show success message or handle the submission
            }}
          >
            Submit to Saber CMS
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  const renderMatchingContent = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Crew-Mission Matching
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen('matching')}
        >
          New Match
        </Button>
      </Box>

      <Grid container spacing={3}>
        {matchingData?.map((match, index) => (
          <Grid item xs={12} md={4} key={match.id}>
            <AnimatedCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {match.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rank #{index + 1}
                    </Typography>
                  </Box>
                </Box>

                <Box mb={2}>
                  <LinearProgress
                    variant="determinate"
                    value={match.match_score * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'primary.main',
                      },
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" align="right">
                    Match Score: {(match.match_score * 100).toFixed(1)}%
                  </Typography>
                </Box>

                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Chip
                      icon={<WorkIcon />}
                      label={`${match.years_experience} years`}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Chip
                      icon={<FlightTakeoffIcon />}
                      label={`${match.flight_hours} hours`}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Box mt={2} display="flex" justifyContent="flex-end">
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderRiskContent = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Risk Assessment Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={() => loadData()}
        >
          Update Assessment
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AnimatedCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <WarningIcon />
                </Avatar>
                <Typography variant="h6">Overall Risk Assessment</Typography>
              </Box>

              {riskData && (
                <>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h4" sx={{ mr: 2 }}>
                      {(riskData.score * 100).toFixed(1)}%
                    </Typography>
                    <RiskChip
                      label={riskData.level.toUpperCase()}
                      risklevel={riskData.level}
                    />
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={riskData.score * 100}
                    color={
                      riskData.level === 'high' ? 'error' :
                      riskData.level === 'medium' ? 'warning' : 'success'
                    }
                    sx={{ height: 10, borderRadius: 5, mb: 2 }}
                  />

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Risk Factors:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {riskData.factors.map((factor, index) => (
                      <Chip
                        key={index}
                        label={factor}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
          </AnimatedCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <AnimatedCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Risk Trends
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <TrendingDownIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Experience Level"
                    secondary="15% decrease in risk"
                  />
                  <ListItemSecondaryAction>
                    <Chip label="Positive" color="success" size="small" />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <TrendingUpIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Fatigue Levels"
                    secondary="5% increase in risk"
                  />
                  <ListItemSecondaryAction>
                    <Chip label="Monitor" color="warning" size="small" />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <TrendingDownIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Training Compliance"
                    secondary="10% decrease in risk"
                  />
                  <ListItemSecondaryAction>
                    <Chip label="Positive" color="success" size="small" />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </AnimatedCard>
        </Grid>
      </Grid>
    </Box>
  );

  const renderScheduleContent = () => {
    console.log('Rendering schedule content, data:', scheduleData);

    if (loading) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px">
          <CircularProgress size={40} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading schedule data...
          </Typography>
        </Box>
      );
    }

    if (error) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="400px">
          <ErrorIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
          <Typography variant="h6" color="error" gutterBottom>
            Error Loading Schedule
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={loadData}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </Box>
      );
    }

    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Schedule Optimization
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpen('schedule')}
          >
            Add Assignment
          </Button>
        </Box>

        {scheduleData.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="300px">
            <CalendarIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Schedule Data Available
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Click the "Add Assignment" button to create a new schedule
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {scheduleData.map((day, dayIndex) => (
              <Grid item xs={12} key={day.date}>
                <AnimatedCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <CalendarIcon />
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {new Date(day.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>

                    <TableContainer component={Paper} elevation={0}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Mission</TableCell>
                            <TableCell>Crew</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {day.assignments?.map((assignment, index) => (
                            <TableRow key={`${day.date}-${index}`}>
                              <TableCell>
                                <Box display="flex" alignItems="center">
                                  <FlightTakeoffIcon sx={{ mr: 1, color: 'primary.main' }} />
                                  {assignment.mission_type}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box display="flex" alignItems="center">
                                  <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                                  {assignment.crew_name}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box display="flex" alignItems="center">
                                  <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                                  {`${assignment.start_time} - ${assignment.end_time}`}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={assignment.status || 'Scheduled'}
                                  color="success"
                                  size="small"
                                />
                              </TableCell>
                              <TableCell align="right">
                                <IconButton size="small" color="primary">
                                  <EditIcon />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </AnimatedCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'fatigue':
        return renderFatigueContent();
      case 'matching':
        return renderMatchingContent();
      case 'risk':
        return renderRiskContent();
      case 'schedule':
        return renderScheduleContent();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: 120,
              textTransform: 'none',
              fontWeight: 'bold',
            },
          }}
        >
          <Tab
            value="fatigue"
            label="Fatigue Analysis"
            icon={<AccessTimeIcon />}
            iconPosition="start"
          />
          <Tab
            value="matching"
            label="Crew Matching"
            icon={<GroupIcon />}
            iconPosition="start"
          />
          <Tab
            value="risk"
            label="Risk Assessment"
            icon={<WarningIcon />}
            iconPosition="start"
          />
          <Tab
            value="schedule"
            label="Schedule"
            icon={<ScheduleIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        renderContent()
      )}

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'matching' ? 'New Crew-Mission Match' : 'Add Schedule Assignment'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Crew Member</InputLabel>
              <Select label="Crew Member">
                {mockCrewData.map((crew) => (
                  <MenuItem key={crew.id} value={crew.id}>
                    {crew.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Mission</InputLabel>
              <Select label="Mission">
                {mockMissionData.map((mission) => (
                  <MenuItem key={mission.id} value={mission.id}>
                    {mission.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Start Time"
              type="time"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="End Time"
              type="time"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleDialogClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {renderSubmissionStatus()}
      {renderPlanDetails()}
    </Box>
  );
};

export default CrewManagementSystem; 