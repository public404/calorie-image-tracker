import { useState } from 'react';
import { ProfileForm } from '@/components/ProfileForm';
import { PlanResults } from '@/components/PlanResults';
import { FoodLookup } from '@/components/FoodLookup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Calculator, Utensils, Zap } from 'lucide-react';

interface ProfileData {
  name: string;
  age: string;
  weight: string;
  height: string;
  heightUnit: 'cm' | 'feet';
  heightFt: string;
  heightIn: string;
  gender: string;
  activity: string;
  goal: string;
  targetWeight: string;
  dietType: string;
}

interface PlanData {
  name: string;
  goal: string;
  targetKg?: number;
  daysRequired?: number;
  calories: number;
  dietPlan: string[];
  workoutPlan: { day: string; exercises: string[] }[];
}

const Index = () => {
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [activeTab, setActiveTab] = useState('profile');

  const calculatePlan = (data: ProfileData) => {
    // Calculate height in cm
    let heightCm: number;
    if (data.heightUnit === 'cm') {
      heightCm = parseFloat(data.height);
    } else {
      const ft = parseFloat(data.heightFt);
      const inches = parseFloat(data.heightIn);
      heightCm = ft * 30.48 + inches * 2.54;
    }

    const age = parseInt(data.age);
    const weight = parseFloat(data.weight);
    const targetKg = parseFloat(data.targetWeight);

    // BMR calculation (Mifflin-St Jeor Equation)
    const bmr = 10 * weight + 6.25 * heightCm - 5 * age + (data.gender === 'Male' ? 5 : -161);

    // Activity level multipliers
    const activityMultipliers = {
      'Sedentary': 1.2,
      'Light': 1.375,
      'Moderate': 1.55,
      'Active': 1.725,
      'Very Active': 1.9
    };

    let calories = bmr * activityMultipliers[data.activity as keyof typeof activityMultipliers];

    // Adjust calories based on goal
    let daysRequired: number | undefined;
    
    if (data.goal === 'Weight Loss') {
      const totalDeficit = targetKg * 7700; // 7700 calories per kg
      const dailyDeficit = 500;
      daysRequired = Math.round(totalDeficit / dailyDeficit);
      calories -= dailyDeficit;
    } else if (data.goal === 'Weight Gain') {
      const totalSurplus = targetKg * 7700;
      const dailySurplus = 500;
      daysRequired = Math.round(totalSurplus / dailySurplus);
      calories += dailySurplus;
    }

    // Generate diet plan
    const dietPlans = {
      'Weight Loss': {
        'Vegetarian': [
          '🌅 Breakfast: Oats with banana and almonds',
          '🍽️ Lunch: Mixed vegetables with dal and brown rice',
          '🥤 Snack: Buttermilk with roasted chana',
          '🌙 Dinner: Moong soup with roti and fresh salad'
        ],
        'Non-Vegetarian': [
          '🌅 Breakfast: Scrambled eggs with brown bread',
          '🍽️ Lunch: Grilled chicken with steamed vegetables',
          '🥤 Snack: Greek yogurt with almonds',
          '🌙 Dinner: Fish curry with roti and salad'
        ]
      },
      'Weight Gain': {
        'Vegetarian': [
          '🌅 Breakfast: Paneer paratha with full-fat milk',
          '🍽️ Lunch: Rajma with rice and ghee',
          '🥤 Snack: Peanut butter sandwich with dry fruits',
          '🌙 Dinner: Soya curry with paratha and salad'
        ],
        'Non-Vegetarian': [
          '🌅 Breakfast: Eggs with toast and protein shake',
          '🍽️ Lunch: Chicken curry with rice and curd',
          '🥤 Snack: Chicken sandwich with mixed nuts',
          '🌙 Dinner: Mutton curry with paratha'
        ]
      },
      'Maintain Weight': {
        'Vegetarian': [
          '🌅 Breakfast: Fresh fruits with oats and nuts',
          '🍽️ Lunch: Vegetable curry with rice',
          '🥤 Snack: Milk or seasonal fruit',
          '🌙 Dinner: Roti with sabzi and curd'
        ],
        'Non-Vegetarian': [
          '🌅 Breakfast: Eggs with whole wheat toast',
          '🍽️ Lunch: Chicken with vegetables and rice',
          '🥤 Snack: Protein shake or fruit',
          '🌙 Dinner: Fish with roti and vegetables'
        ]
      }
    };

    // Generate workout plan
    const workoutPlans = {
      'Weight Loss': [
        { day: 'Day 1', exercises: ['Jumping jacks (3×30)', 'Squats (3×15)', 'Planks (3×30s)'] },
        { day: 'Day 2', exercises: ['High knees (3×30)', 'Lunges (3×12)', 'Mountain climbers (3×20)'] },
        { day: 'Day 3', exercises: ['Jump rope (20 min)', 'Planks (3×45s)', 'Power walking (30 min)'] },
        { day: 'Day 4', exercises: ['Cycling (30 min)', 'Squats (3×20)', 'Jumping jacks (3×40)'] },
        { day: 'Day 5', exercises: ['Burpees (3×10)', 'Lunges (3×15)', 'Planks (3×60s)'] },
        { day: 'Day 6', exercises: ['Power walking (45 min)', 'High knees (3×40)', 'Mountain climbers (3×25)'] },
        { day: 'Day 7', exercises: ['Yoga or stretching (30 min)'] }
      ],
      'Weight Gain': [
        { day: 'Day 1', exercises: ['Push-ups (3×10)', 'Squats (3×15)', 'Dumbbell curls (3×12)'] },
        { day: 'Day 2', exercises: ['Pull-ups (3×8)', 'Lunges (3×12)', 'Deadlifts (3×10)'] },
        { day: 'Day 3', exercises: ['Bench press (3×10)', 'Shoulder press (3×12)', 'Leg raises (3×15)'] },
        { day: 'Day 4', exercises: ['Rest day or light stretching'] },
        { day: 'Day 5', exercises: ['Push-ups (3×12)', 'Squats (3×20)', 'Plank hold (3×45s)'] },
        { day: 'Day 6', exercises: ['Pull-ups (3×10)', 'Deadlifts (3×12)', 'Shoulder press (3×15)'] },
        { day: 'Day 7', exercises: ['Full body light circuit or yoga'] }
      ],
      'Maintain Weight': [
        { day: 'Day 1', exercises: ['Brisk walking (30 min)'] },
        { day: 'Day 2', exercises: ['Yoga and light stretching (30 min)'] },
        { day: 'Day 3', exercises: ['Jogging (20 min)', 'Squats (2×15)'] },
        { day: 'Day 4', exercises: ['Rest day or deep breathing exercises'] },
        { day: 'Day 5', exercises: ['Jump rope (15 min)', 'Lunges (2×12)'] },
        { day: 'Day 6', exercises: ['Core strengthening: planks, crunches (20 min)'] },
        { day: 'Day 7', exercises: ['Dancing or swimming (30 min)'] }
      ]
    };

    const result: PlanData = {
      name: data.name,
      goal: data.goal,
      targetKg: data.goal !== 'Maintain Weight' ? targetKg : undefined,
      daysRequired,
      calories,
      dietPlan: dietPlans[data.goal as keyof typeof dietPlans][data.dietType as keyof typeof dietPlans['Weight Loss']],
      workoutPlan: workoutPlans[data.goal as keyof typeof workoutPlans]
    };

    setPlanData(result);
    setActiveTab('results');
  };

  const resetPlan = () => {
    setPlanData(null);
    setActiveTab('profile');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Smart Fitness Tracker</h1>
          <p className="text-xl md:text-2xl text-white/90">
            Your personalized health companion for achieving fitness goals
          </p>
          <div className="flex justify-center">
            <Activity className="h-12 w-12 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!planData} className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Results
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Food Lookup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileForm onCalculate={calculatePlan} />
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {planData ? (
              <div className="space-y-6">
                <PlanResults planData={planData} />
                <div className="text-center">
                  <Button onClick={resetPlan} variant="outline" size="lg">
                    Create New Plan
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">
                    Complete your profile first to see your personalized plan
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="food" className="space-y-6">
            <FoodLookup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
