'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield, Database, Bell, Globe } from 'lucide-react';

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState({
    adminPassword: '',
    emailNotifications: true,
    leadAlerts: true,
    autoBackup: false,
    maintenanceMode: false
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">General</h2>
        <p className="text-gray-600">Configure your admin panel and system preferences</p>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="adminPassword">Admin Password</Label>
            <Input
              id="adminPassword"
              type="password"
              placeholder="Enter new admin password"
              value={settings.adminPassword}
              onChange={(e) => setSettings({...settings, adminPassword: e.target.value})}
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave blank to keep current password
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500">Receive email alerts for new leads</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Lead Alerts</Label>
              <p className="text-sm text-gray-500">Get notified about high-priority leads</p>
            </div>
            <Switch
              checked={settings.leadAlerts}
              onCheckedChange={(checked) => setSettings({...settings, leadAlerts: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            System Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Backup</Label>
              <p className="text-sm text-gray-500">Automatically backup data daily</p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-gray-500">Put system in maintenance mode</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Environment Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Environment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Environment:</span>
            <span className="text-sm font-medium">{process.env.NODE_ENV || 'development'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Supabase URL:</span>
            <span className="text-sm font-medium">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Configured' : 'Not configured'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Admin Email:</span>
            <span className="text-sm font-medium">
              {process.env.ADMIN_EMAIL || 'Not configured'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-8">
          Save Settings
        </Button>
      </div>
    </div>
  );
}


