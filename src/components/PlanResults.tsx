import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, Utensils, Dumbbell, Flame } from 'lucide-react';

interface PlanData {
  name: string;
  goal: string;
  targetKg?: number;
  daysRequired?: number;
  calories: number;
  dietPlan: string[];
  workoutPlan: { day: string; exercises: string[] }[];
}

interface PlanResultsProps {
  planData: PlanData;
}

export const PlanResults = ({ planData }: PlanResultsProps) => {
  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'Weight Loss': return 'bg-gradient-accent';
      case 'Weight Gain': return 'bg-gradient-secondary';
      default: return 'bg-gradient-primary';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="shadow-glow border-0">
        <CardHeader className={`${getGoalColor(planData.goal)} rounded-t-lg`}>
          <CardTitle className="text-2xl font-bold text-white text-center">
            Hi {planData.name}, here's your personalized {planData.goal.toLowerCase()} plan! 🎯
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {planData.targetKg && (
              <div className="flex flex-col items-center space-y-2">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="text-lg font-semibold">
                    {planData.goal === 'Weight Loss' ? 'Lose' : 'Gain'} {planData.targetKg} kg
                  </p>
                </div>
              </div>
            )}
            
            {planData.daysRequired && (
              <div className="flex flex-col items-center space-y-2">
                <Calendar className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-lg font-semibold">{planData.daysRequired} days</p>
                </div>
              </div>
            )}
            
            <div className="flex flex-col items-center space-y-2">
              <Flame className="h-8 w-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Daily Calories</p>
                <p className="text-lg font-semibold">{Math.round(planData.calories)} kcal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diet Plan */}
        <Card className="shadow-medium">
          <CardHeader className="bg-gradient-secondary rounded-t-lg">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Diet Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {planData.dietPlan.map((meal, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <p className="text-sm leading-relaxed">{meal}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workout Plan */}
        <Card className="shadow-medium">
          <CardHeader className="bg-gradient-primary rounded-t-lg">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              7-Day Workout Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {planData.workoutPlan.map((day, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <Badge variant="outline" className="min-w-fit">
                    {day.day}
                  </Badge>
                  <div className="flex-1">
                    <p className="text-sm">{day.exercises.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Card */}
      <Card className="shadow-medium border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-lg font-medium text-primary mb-2">💧 Remember to stay hydrated!</p>
            <p className="text-muted-foreground">Consistency is key to achieving your fitness goals. Stay motivated and track your progress!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};