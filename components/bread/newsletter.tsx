"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { Wheat, CheckCircle2 } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // בדיקה ראשונה בקונסול
    console.log("Newsletter form submitted! Email:", email);

    if (!email || !email.includes("@")) {
      console.log("Validation failed: invalid email");
      setStatus("error")
      setMessage(t('newsletter.error'))
      return
    }

    setStatus("loading")

    try {
      console.log("Starting fetch request to /api/newsletter...");

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      console.log("Server response data:", data);

      if (response.ok) {
        console.log("Success! Email sent and registered.");
        setStatus("success")
        setMessage(t('newsletter.success'))
        setEmail("")

        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 3000)
      } else {
        console.error("Server error:", data.error);
        setStatus("error")
        setMessage(data.error || t('newsletter.error'))
      }
    } catch (error) {
      console.error("Fetch/Network error:", error);
      setStatus("error")
      setMessage(t('newsletter.error'))
    }
  }

  return (
    <Card className="border-l-4 border-foreground/20 bg-card shadow-none">
      <CardContent className="pt-6">
        <div className="text-center mb-4">
          <Wheat className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-black text-foreground mb-2 uppercase tracking-tight">
            {t('newsletter.title')}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t('newsletter.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder={t('newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={status === "loading" || status === "success"}
            />
            <Button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="shrink-0"
            >
              {status === "success" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : status === "loading" ? (
                <span className="loading">...</span>
              ) : (
                t('newsletter.button')
              )}
            </Button>
          </div>

          {message && (
            <p className={`text-sm text-center ${status === "success" ? "text-primary" : "text-destructive"
              }`}>
              {message}
            </p>
          )}
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          {t('newsletter.privacy')}
        </p>
      </CardContent>
    </Card>
  )
}