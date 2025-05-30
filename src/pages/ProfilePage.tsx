import React, { useState } from 'react';
import { User, Mail, Save, Camera } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
  });
  
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: user?.preferences?.dietaryRestrictions.includes('vegetarian') || false,
    vegan: user?.preferences?.dietaryRestrictions.includes('vegan') || false,
    glutenFree: user?.preferences?.dietaryRestrictions.includes('gluten-free') || false,
    dairyFree: user?.preferences?.dietaryRestrictions.includes('dairy-free') || false,
    nutFree: user?.preferences?.dietaryRestrictions.includes('nut-free') || false,
    lowCarb: user?.preferences?.dietaryRestrictions.includes('low-carb') || false,
  });
  
  const [allergies, setAllergies] = useState<string[]>(
    user?.preferences?.allergies || []
  );
  
  const [measurementUnits, setMeasurementUnits] = useState<'metric' | 'imperial'>(
    user?.preferences?.measurementUnits || 'metric'
  );
  
  const [isLoading, setIsLoading] = useState(false);
  const [newAllergy, setNewAllergy] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Convert dietary preferences to array
      const dietaryRestrictions = Object.entries(dietaryPreferences)
        .filter(([_, value]) => value)
        .map(([key, _]) => {
          // Convert camelCase to kebab-case
          return key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        });
      
      await updateProfile({
        ...user,
        name: formData.name,
        photoURL: formData.photoURL,
        preferences: {
          dietaryRestrictions,
          allergies,
          measurementUnits
        }
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddAllergy = () => {
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };
  
  const handleRemoveAllergy = (allergyToRemove: string) => {
    setAllergies(allergies.filter(allergy => allergy !== allergyToRemove));
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Profile Information */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                    {formData.photoURL ? (
                      <img 
                        src={formData.photoURL} 
                        alt={formData.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-primary-500" />
                    )}
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-primary-500 text-white p-1.5 rounded-full"
                  >
                    <Camera size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Upload a photo (optional)
                </p>
              </div>
              
              {/* Form Fields */}
              <div className="flex-grow space-y-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  leftIcon={<User size={18} />}
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled
                  leftIcon={<Mail size={18} />}
                  hint="Email cannot be changed"
                />
              </div>
            </div>
          </div>
          
          {/* Dietary Preferences */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-6">Dietary Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Dietary Restrictions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <CheckboxOption
                    id="vegetarian"
                    label="Vegetarian"
                    checked={dietaryPreferences.vegetarian}
                    onChange={(e) => setDietaryPreferences({
                      ...dietaryPreferences,
                      vegetarian: e.target.checked
                    })}
                  />
                  <CheckboxOption
                    id="vegan"
                    label="Vegan"
                    checked={dietaryPreferences.vegan}
                    onChange={(e) => setDietaryPreferences({
                      ...dietaryPreferences,
                      vegan: e.target.checked
                    })}
                  />
                  <CheckboxOption
                    id="gluten-free"
                    label="Gluten Free"
                    checked={dietaryPreferences.glutenFree}
                    onChange={(e) => setDietaryPreferences({
                      ...dietaryPreferences,
                      glutenFree: e.target.checked
                    })}
                  />
                  <CheckboxOption
                    id="dairy-free"
                    label="Dairy Free"
                    checked={dietaryPreferences.dairyFree}
                    onChange={(e) => setDietaryPreferences({
                      ...dietaryPreferences,
                      dairyFree: e.target.checked
                    })}
                  />
                  <CheckboxOption
                    id="nut-free"
                    label="Nut Free"
                    checked={dietaryPreferences.nutFree}
                    onChange={(e) => setDietaryPreferences({
                      ...dietaryPreferences,
                      nutFree: e.target.checked
                    })}
                  />
                  <CheckboxOption
                    id="low-carb"
                    label="Low Carb"
                    checked={dietaryPreferences.lowCarb}
                    onChange={(e) => setDietaryPreferences({
                      ...dietaryPreferences,
                      lowCarb: e.target.checked
                    })}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Allergies</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {allergies.map((allergy, index) => (
                    <div 
                      key={index}
                      className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {allergy}
                      <button
                        type="button"
                        onClick={() => handleRemoveAllergy(allergy)}
                        className="ml-2 text-primary-400 hover:text-primary-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {allergies.length === 0 && (
                    <span className="text-sm text-gray-500">No allergies specified</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add allergy (e.g., peanuts)"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    onClick={handleAddAllergy}
                    disabled={!newAllergy.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Measurement Units</h3>
                <div className="flex space-x-4">
                  <RadioOption
                    id="metric"
                    label="Metric (g, ml)"
                    checked={measurementUnits === 'metric'}
                    onChange={() => setMeasurementUnits('metric')}
                  />
                  <RadioOption
                    id="imperial"
                    label="Imperial (oz, cups)"
                    checked={measurementUnits === 'imperial'}
                    onChange={() => setMeasurementUnits('imperial')}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="p-6 bg-gray-50 flex justify-end">
            <Button
              type="submit"
              isLoading={isLoading}
              leftIcon={<Save size={18} />}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface CheckboxOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ id, label, checked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
      />
      <span>{label}</span>
    </label>
  );
};

interface RadioOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ id, label, checked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-primary-500 border-gray-300 focus:ring-primary-500"
      />
      <span>{label}</span>
    </label>
  );
};

export default ProfilePage;