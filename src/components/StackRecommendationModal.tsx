import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Layers, 
  Database, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Code2, 
  Cpu, 
  ArrowRight,
  Sparkles,
  Server,
  FileCode,
  Lock
} from 'lucide-react';

interface StackRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StackRecommendationModal: React.FC<StackRecommendationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'schema' | 'code' | 'roadmap'>('comparison');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 text-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-700 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-slate-950 p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Modern Stack Migration Architecture
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Next.js 15 Recommended
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Architectural blueprint: Migrating Champion Cricket League from legacy PHP to TypeScript
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/90 px-6 gap-2 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Next.js vs MERN Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'schema'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Prisma Database Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>PHP vs TypeScript API Code</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'roadmap'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Execution Roadmap</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              {/* Verdict Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-xl p-4">
                <h4 className="font-extrabold text-amber-300 text-base mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>The Clear Recommendation: Next.js 15 (App Router) with TypeScript & Prisma</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  While a classical MERN stack (MongoDB, Express, React, Node) works, <strong>Next.js is vastly superior for a nationwide sports league</strong> because cricket trials depend heavily on <strong>regional SEO</strong> (e.g. ranking #1 for "Delhi cricket trials 2026", "Gujarat U16 selection"). Next.js provides Server Components, dynamic OpenGraph previews for player admit cards, and unified API Route Handlers for Razorpay without running two separate servers.
                </p>
              </div>

              {/* Comparative Table */}
              <div className="border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4 text-left">Evaluation Criterion</th>
                      <th className="py-3 px-4 text-left text-amber-300">Next.js 15 + TypeScript (Recommended)</th>
                      <th className="py-3 px-4 text-left text-slate-400">Standard MERN Stack (React + Express)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">SEO & Social Previews</td>
                      <td className="py-3 px-4 text-emerald-400 font-medium">
                        Native SSR & ISR. Dynamic sitemaps, per-state metadata, instant WhatsApp card previews.
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        Client-side SPA. Requires third-party pre-rendering (Prerender.io) to avoid blank Google indexing.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">Razorpay Webhooks & Security</td>
                      <td className="py-3 px-4 text-emerald-400 font-medium">
                        Native Server Actions & Edge API Routes. Zero client exposure of keys, built-in crypto signature validation.
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        Separate Express server required with CORS middleware, process manager (PM2), and SSL cert configs.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">Image & Banner Performance</td>
                      <td className="py-3 px-4 text-emerald-400 font-medium">
                        Automatic WebP/AVIF transcoding via `next/image`. Drastically cuts bandwidth for cricket photography.
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        Manual image compression or reliance on expensive third-party Cloudinary transforms.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">Infrastructure & Hosting Cost</td>
                      <td className="py-3 px-4 text-emerald-400 font-medium">
                        Serverless single-deploy on Vercel, AWS Amplify, or Cloud Run. Scales to zero when trials are quiet.
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        Requires 2 environments: Static frontend (S3/Vercel) + persistent Node server (EC2/Heroku/Render).
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-white">Data Storage & Scaling</td>
                      <td className="py-3 px-4 text-emerald-400 font-medium">
                        Prisma ORM with PostgreSQL or MongoDB. Fully type-safe database queries shared across client & server.
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        Mongoose with MongoDB. No shared end-to-end typing without extra monorepo setup.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Production Prisma Schema (`prisma/schema.prisma`)
                </span>
                <span className="text-[11px] text-slate-400">PostgreSQL / Supabase / Neon</span>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800 leading-relaxed">
{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum BallType {
  LEATHER
  TENNIS
}

enum Specialty {
  BATSMAN
  BOWLER
  ALL_ROUNDER
  WICKETKEEPER
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
  REFUNDED
}

model Player {
  id              String         @id @default(cuid())
  name            String
  age             Int
  category        String         // "U16" or "OPEN"
  phone           String         @unique
  email           String
  specialty       Specialty
  state           String
  city            String
  registrations   Registration[]
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
}

model Registration {
  id              String         @id @default(cuid())
  regNumber       String         @unique // e.g. CCL-2026-98412
  playerId        String
  player          Player         @relation(fields: [playerId], references: [id])
  ballType        BallType
  venueId         String
  venue           TrialVenue     @relation(fields: [venueId], references: [id])
  feeAmount       Float
  paymentStatus   PaymentStatus  @default(PENDING)
  razorpayOrderId String?
  razorpayPaymentId String?
  pointsScored    Int            @default(0)
  qualifiedForCamp Boolean       @default(false)
  admitCardUrl    String?
  createdAt       DateTime       @default(now())
}

model TrialVenue {
  id              String         @id @default(cuid())
  state           String
  city            String
  groundName      String
  address         String
  trialDate       DateTime
  reportingTime   String
  registrations   Registration[]
}`}
              </pre>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400 mb-2">
                Comparison of the legacy PHP script (`api/process-registration.php` + `create-order.php`) with the new modern TypeScript Route Handler (`app/api/checkout/route.ts`).
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Legacy PHP */}
                <div className="bg-slate-950 p-4 rounded-xl border border-red-900/40">
                  <span className="text-[11px] font-bold text-red-400 block mb-2">
                    Legacy PHP (`ccl/api/create-order.php`)
                  </span>
                  <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto">
{`<?php
require('razorpay-php/Razorpay.php');
use Razorpay\\Api\\Api;

$api = new Api($keyId, $keySecret);
$orderData = [
  'receipt' => 'rcpt_' . rand(1000,9999),
  'amount' => $_POST['amount'] * 100,
  'currency' => 'INR'
];
$order = $api->order->create($orderData);
echo json_encode(['order_id' => $order['id']]);
?>`}
                  </pre>
                </div>

                {/* Modern TypeScript */}
                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-2">
                    Modern Next.js Route (`app/api/checkout/route.ts`)
                  </span>
                  <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto">
{`import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST(req: NextRequest) {
  const { name, phone, email, speciality, ballType, venueId } = await req.json();

  const order = await rzp.orders.create({
    amount: getRegistrationConfig(ballType),
    currency: 'INR',
    receipt: \`rcpt_\${Date.now()}\`
  });

  return NextResponse.json({ orderId: order.id, status: 'created' });
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm">
                Recommended 5-Phase Migration Plan
              </h4>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">1</span>
                  <div>
                    <strong className="text-white">Project Initialization & TypeScript Setup:</strong> Initialize Next.js 15 App Router with Tailwind CSS v4, Lucide icons, and Motion. Configure environment secrets (`.env.local`) for Razorpay keys and database URLs.
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">2</span>
                  <div>
                    <strong className="text-white">Component & Layout Migration:</strong> Port all static PHP templates (`header.php`, `index.php`, `about.php`, `gallery.php`) into reusable React Server and Client components with responsive mobile design.
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">3</span>
                  <div>
                    <strong className="text-white">Razorpay Webhook & Payment Verification:</strong> Replace legacy PHP curl scripts with Next.js Route Handlers. Implement HMAC SHA256 signature verification to prevent fraudulent registrations.
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0">4</span>
                  <div>
                    <strong className="text-white">Database & Automated Messaging:</strong> Replace fragile Google Sheets appends with durable PostgreSQL via Prisma. Send instant WhatsApp & Email confirmation with downloadable PDF Admit Cards.
                  </div>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold shrink-0">5</span>
                  <div>
                    <strong className="text-white">DNS Cutover & Zero-Downtime Deployment:</strong> Deploy to Vercel or Cloud Run container. Re-point `championcricketleague.com` DNS A-records without dropping a single active trial registration.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-500">Champion Cricket League Stack Migration Architecture</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
