import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Utensils, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NutritionData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export const FoodLookup = () => {
  const [foodQuery, setFoodQuery] = useState('');
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Sample nutrition data - in a real app, this would connect to an API
  const sampleFoods = {
    'apple': { name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
    'banana': { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
    'chicken breast': { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
    'rice': { name: 'Rice (cooked)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
    'eggs': { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 },
    'oats': { name: 'Oats', calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 11 },
    'salmon': { name: 'Salmon', calories: 208, protein: 25, carbs: 0, fat: 12, fiber: 0 },
    'broccoli': { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6 },
    'sweet potato': { name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 },
    'yogurt': { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0 }
  };

  const handleSearch = async () => {
    if (!foodQuery.trim()) {
      toast({
        title: "Please enter a food item",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const key = foodQuery.toLowerCase().trim();
      const found = sampleFoods[key as keyof typeof sampleFoods];
      
      if (found) {
        setNutritionData(found);
        toast({
          title: "Food found!",
          description: `Nutrition data for ${found.name} has been loaded.`
        });
      } else {
        setNutritionData(null);
        toast({
          title: "Food not found",
          description: "Try searching for: apple, banana, chicken breast, rice, eggs, oats, salmon, broccoli, sweet potato, or yogurt",
          variant: "destructive"
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="shadow-medium">
        <CardHeader className="bg-gradient-accent rounded-t-lg">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            Food Calorie Lookup
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="food-search">Search for a food item</Label>
            <div className="flex gap-2">
              <Input
                id="food-search"
                value={foodQuery}
                onChange={(e) => setFoodQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., apple, chicken breast, rice"
                className="flex-1"
              />
              <Button 
                onClick={handleSearch} 
                disabled={loading}
                variant="default"
              >
                <Search className="h-4 w-4" />
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Try searching for: apple, banana, chicken breast, rice, eggs, oats, salmon, broccoli, sweet potato, yogurt</p>
          </div>
        </CardContent>
      </Card>

      {nutritionData && (
        <Card className="shadow-medium border-l-4 border-l-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              {nutritionData.name} - Nutrition Facts (per 100g)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-primary rounded-lg text-white">
                <div className="text-2xl font-bold">{nutritionData.calories}</div>
                <div className="text-sm">Calories</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-secondary rounded-lg text-white">
                <div className="text-2xl font-bold">{nutritionData.protein}g</div>
                <div className="text-sm">Protein</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-accent rounded-lg text-white">
                <div className="text-2xl font-bold">{nutritionData.carbs}g</div>
                <div className="text-sm">Carbs</div>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold text-foreground">{nutritionData.fat}g</div>
                <div className="text-sm text-muted-foreground">Fat</div>
              </div>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-xl font-bold text-foreground">{nutritionData.fiber}g</div>
                <div className="text-sm text-muted-foreground">Fiber</div>
              </div>
              
              <div className="flex items-center justify-center">
                <Badge variant="outline" className="text-center">
                  Nutritional Data
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};