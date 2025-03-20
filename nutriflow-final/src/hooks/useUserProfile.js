import { useState } from 'react';

/**
 * Custom hook for user profile management
 * 
 * @returns {Object} Hook methods and state
 */
export function useUserProfile() {
  const [profile, setProfile] = useState({
    dietaryPreferences: ["Balanced diet"],
    healthGoals: ["Weight maintenance", "Energy optimization"],
    activityLevel: "Moderate",
    allergies: [],
    medicalConditions: []
  });

  /**
   * Update the user profile
   * 
   * @param {Object} newProfile - The new profile data
   */
  const updateProfile = (newProfile) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      ...newProfile
    }));
  };

  /**
   * Add a dietary preference
   * 
   * @param {string} preference - The dietary preference to add
   */
  const addDietaryPreference = (preference) => {
    if (!profile.dietaryPreferences.includes(preference)) {
      setProfile(prevProfile => ({
        ...prevProfile,
        dietaryPreferences: [...prevProfile.dietaryPreferences, preference]
      }));
    }
  };

  /**
   * Remove a dietary preference
   * 
   * @param {string} preference - The dietary preference to remove
   */
  const removeDietaryPreference = (preference) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      dietaryPreferences: prevProfile.dietaryPreferences.filter(p => p !== preference)
    }));
  };

  /**
   * Add a health goal
   * 
   * @param {string} goal - The health goal to add
   */
  const addHealthGoal = (goal) => {
    if (!profile.healthGoals.includes(goal)) {
      setProfile(prevProfile => ({
        ...prevProfile,
        healthGoals: [...prevProfile.healthGoals, goal]
      }));
    }
  };

  /**
   * Remove a health goal
   * 
   * @param {string} goal - The health goal to remove
   */
  const removeHealthGoal = (goal) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      healthGoals: prevProfile.healthGoals.filter(g => g !== goal)
    }));
  };

  /**
   * Add an allergy
   * 
   * @param {string} allergy - The allergy to add
   */
  const addAllergy = (allergy) => {
    if (!profile.allergies.includes(allergy)) {
      setProfile(prevProfile => ({
        ...prevProfile,
        allergies: [...prevProfile.allergies, allergy]
      }));
    }
  };

  /**
   * Remove an allergy
   * 
   * @param {string} allergy - The allergy to remove
   */
  const removeAllergy = (allergy) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      allergies: prevProfile.allergies.filter(a => a !== allergy)
    }));
  };

  /**
   * Set the activity level
   * 
   * @param {string} level - The activity level
   */
  const setActivityLevel = (level) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      activityLevel: level
    }));
  };

  return {
    profile,
    updateProfile,
    addDietaryPreference,
    removeDietaryPreference,
    addHealthGoal,
    removeHealthGoal,
    addAllergy,
    removeAllergy,
    setActivityLevel
  };
}
