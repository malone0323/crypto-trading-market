import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CustomButton } from './ui/custom-button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Twitter, Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProfileData {
  username?: string;
  twitterLink?: string;
  bio?: string;
  profilePhoto?: string;
  bannerPhoto?: string;
  solanaAddress?: string;
}

interface ProfileSectionProps {
  initialData: ProfileData;
  onSave: (data: ProfileData) => void;
}

export function ProfileSection({ initialData, onSave }: ProfileSectionProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: initialData?.username || '',
    twitterLink: initialData?.twitterLink || '',
    bio: initialData?.bio || '',
    profilePhoto: initialData?.profilePhoto || '/placeholder.svg?height=100&width=100',
    bannerPhoto: initialData?.bannerPhoto || '/placeholder.svg?height=200&width=600',
    solanaAddress: initialData?.solanaAddress || '',
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profilePhoto' | 'bannerPhoto') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSaveStatus('idle');
    onSave(profileData);
    setSaveStatus('success');
    toast.success('Profile updated successfully!');
  
    // Reset the success message after 3 seconds
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const verifyTwitterAccount = async () => {
    // This is a placeholder. In a real implementation, you would initiate the Twitter OAuth flow
    // and verify the connection between the wallet and the Twitter account.
    toast.info('Twitter account verification initiated. Please check your Twitter app for authorization.');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={profileData.bannerPhoto ?? '/placeholder.svg?height=200&width=600'}
              alt="Banner"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <label htmlFor="banner-upload" className="absolute top-2 right-2 p-2 bg-black/50 rounded-full cursor-pointer hover:bg-black/70 transition-colors">
              <Camera className="h-4 w-4 text-white" />
              <input id="banner-upload" type="file" accept="image/*" onChange={(e) => handlePhotoChange(e, 'bannerPhoto')} className="hidden" />
            </label>
          </div>
          <div className="px-4 pb-4 pt-14 relative">
            <div className="absolute -top-12 left-4">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src={profileData.profilePhoto ?? '/placeholder.svg?height=100&width=100'} />
                <AvatarFallback>{profileData.username?.charAt(0) ?? 'U'}</AvatarFallback>
              </Avatar>
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4 text-primary-foreground" />
                <input id="profile-upload" type="file" accept="image/*" onChange={(e) => handlePhotoChange(e, 'profilePhoto')} className="hidden" />
              </label>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{profileData.username || 'Anonymous'}</h2>
              <p className="text-sm text-muted-foreground">{profileData.bio || 'No bio available'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={profileData.username || ''}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitterLink">X (Twitter) Profile Link</Label>
          <div className="flex space-x-2">
            <Input
              id="twitterLink"
              name="twitterLink"
              value={profileData.twitterLink || ''}
              onChange={handleChange}
              placeholder="https://twitter.com/yourusername"
            />
            <CustomButton
              variant="outline"
              size="icon"
              onClick={() => window.open(profileData.twitterLink || '', '_blank')}
              disabled={!profileData.twitterLink}
            >
              <Twitter className="h-4 w-4" />
            </CustomButton>
            <CustomButton
              variant="gold"
              onClick={verifyTwitterAccount}
            >
              Verify Account
            </CustomButton>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={profileData.bio || ''}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            rows={3}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="solanaAddress">Solana Address</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="solanaAddress"
              name="solanaAddress"
              value={profileData.solanaAddress || ''}
              onChange={handleChange}
              placeholder="Enter your Solana address"
              className="flex-1"
            />
            <CustomButton
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(profileData.solanaAddress || '')}
            >
              <Copy className="h-4 w-4" />
            </CustomButton>
          </div>
        </div>

        <CustomButton variant="gold" onClick={handleSave} className="w-full">
          Save Profile
        </CustomButton>
        {saveStatus === 'success' && (
          <div className="mt-2 p-2 bg-green-100 border border-green-300 text-green-700 rounded-md text-center">
            Profile saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}
