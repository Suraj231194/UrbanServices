import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHmac } from "https://deno.land/std@0.168.0/node/crypto.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { orderCreationId, razorpayPaymentId, razorpaySignature } = await req.json();

        if (!orderCreationId || !razorpayPaymentId || !razorpaySignature) {
            throw new Error("Missing required parameters");
        }

        const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET") ?? "";

        const shasum = createHmac("sha256", keySecret);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature) {
            return new Response(JSON.stringify({ verified: false, error: "Invalid signature" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400,
            });
        }

        // You would typically update the booking status in the database here
        // For now, we return success and let the client handle the DB update 
        // (though securely, you should do it here using Supabase Admin client)

        return new Response(JSON.stringify({ verified: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
