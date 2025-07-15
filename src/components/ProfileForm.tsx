import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Target, Activity } from 'lucide-react';

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

interface ProfileFormProps {
  onCalculate: (data: ProfileData) => void;
}

export const ProfileForm = ({ onCalculate }: ProfileFormProps) => {
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    age: '',
    weight: '',
    height: '',
    heightUnit: 'cm',
    heightFt: '',
    heightIn: '',
    gender: '',
    activity: '',
    goal: '',
    targetWeight: '5',
    dietType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const showTargetWeight = formData.goal === 'Weight Loss' || formData.goal === 'Weight Gain';

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader className="text-center bg-gradient-hero rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <User className="h-6 w-6" />
          Personal Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="25"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="70"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Height Unit</Label>
              <Select
                value={formData.heightUnit}
                onValueChange={(value: 'cm' | 'feet') => setFormData({ ...formData, heightUnit: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">Centimeters</SelectItem>
                  <SelectItem value="feet">Feet & Inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.heightUnit === 'cm' ? (
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="175"
                required
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heightFt">Feet</Label>
                <Input
                  id="heightFt"
                  type="number"
                  value={formData.heightFt}
                  onChange={(e) => setFormData({ ...formData, heightFt: e.target.value })}
                  placeholder="5"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heightIn">Inches</Label>
                <Input
                  id="heightIn"
                  type="number"
                  value={formData.heightIn}
                  onChange={(e) => setFormData({ ...formData, heightIn: e.target.value })}
                  placeholder="9"
                  required
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Activity Level</Label>
              <Select
                value={formData.activity}
                onValueChange={(value) => setFormData({ ...formData, activity: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedentary">Sedentary</SelectItem>
                  <SelectItem value="Light">Light</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Very Active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Goal
              </Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => setFormData({ ...formData, goal: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                  <SelectItem value="Weight Gain">Weight Gain</SelectItem>
                  <SelectItem value="Maintain Weight">Maintain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showTargetWeight && (
              <div className="space-y-2">
                <Label htmlFor="targetWeight">
                  Target: {formData.goal === 'Weight Loss' ? 'Kg to lose' : 'Kg to gain'}
                </Label>
                <Input
                  id="targetWeight"
                  type="number"
                  value={formData.targetWeight}
                  onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                  placeholder="5"
                  required
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Diet Type</Label>
            <Select
              value={formData.dietType}
              onValueChange={(value) => setFormData({ ...formData, dietType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select diet preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" variant="gradient" size="lg" className="w-full">
            <Activity className="h-5 w-5 mr-2" />
            Calculate My Plan
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};