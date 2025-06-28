
-- Create table for storing user upgrade/citizenship applications
CREATE TABLE public.user_upgrades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  country_of_residence TEXT NOT NULL,
  occupation TEXT NOT NULL,
  education_level TEXT NOT NULL,
  gnh_skills TEXT,
  citizenship_reason TEXT,
  digital_signature TEXT NOT NULL,
  signature_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  application_status TEXT DEFAULT 'pending' CHECK (application_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own upgrade applications
ALTER TABLE public.user_upgrades ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own upgrade applications
CREATE POLICY "Users can view their own upgrade applications" 
  ON public.user_upgrades 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own upgrade applications
CREATE POLICY "Users can create their own upgrade applications" 
  ON public.user_upgrades 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own upgrade applications
CREATE POLICY "Users can update their own upgrade applications" 
  ON public.user_upgrades 
  FOR UPDATE 
  USING (auth.uid() = user_id);
