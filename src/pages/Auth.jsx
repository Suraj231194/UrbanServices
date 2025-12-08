import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "", fullName: "", phone: "" });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Clear any stale sessions on mount and check if already logged in
  useEffect(() => {
    const checkAndClearSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        // Clear stale session
        await supabase.auth.signOut();
        return;
      }

      if (session) {
        // Already logged in, redirect to home
        navigate("/");
      }
    };

    checkAndClearSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email.trim(),
        password: loginData.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/");
    } catch (error) {
      console.error("Login Error Details:", error);
      let message = error.message;
      if (error.message.includes("Invalid login credentials")) {
        message = "Invalid email or password. Please try again.";
      }
      toast({
        title: "Login Failed",
        description: message + (error.cause ? ` Cause: ${error.cause}` : ""),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSignupSuccess(false);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email.trim(),
        password: signupData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: signupData.fullName.trim(),
            phone: signupData.phone.trim(),
          },
        },
      });

      if (error) throw error;

      // Show success and switch to login
      setSignupSuccess(true);
      toast({
        title: "Account Created!",
        description: "Please sign in with your new account.",
      });

      // Pre-fill login email and switch tabs
      setLoginData({ email: signupData.email, password: "" });
      setSignupData({ email: "", password: "", fullName: "", phone: "" });

      setTimeout(() => {
        setActiveTab("login");
        setSignupSuccess(false);
      }, 1500);

    } catch (error) {
      let message = error.message;
      if (error.message.includes("User already registered")) {
        message = "This email is already registered. Please sign in instead.";
        setLoginData({ email: signupData.email, password: "" });
        setActiveTab("login");
      }
      toast({
        title: "Sign Up Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

      <Card className="w-full max-w-md shadow-2xl border-border/50 backdrop-blur-sm bg-card/80 relative z-50">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              UrbanServices
            </CardTitle>
            <CardDescription className="text-base">
              Your trusted home services partner
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 p-1 bg-muted/50 rounded-xl">
              <TabsTrigger value="login" className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6 animate-in slide-in-from-left-2 duration-300">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    autoComplete="email"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    autoComplete="current-password"
                    className="h-11"
                  />
                </div>
                <Button type="submit" className="w-full h-11 text-base font-medium shadow-lg shadow-primary/20" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6 animate-in slide-in-from-right-2 duration-300">
              {signupSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xl font-bold">Account Created!</p>
                    <p className="text-sm text-muted-foreground">Redirecting you to login...</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="John Doe"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                      autoComplete="name"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      required
                      autoComplete="tel"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      autoComplete="email"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="h-11"
                    />
                  </div>
                  <Button type="submit" className="w-full h-11 text-base font-medium shadow-lg shadow-primary/20" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;