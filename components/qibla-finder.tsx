"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Compass, MapPin, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function QiblaFinder() {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null)
  const [compassHeading, setCompassHeading] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [manualLocation, setManualLocation] = useState({ latitude: null, longitude: null })

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setCompassHeading(event.alpha)
    }
  }

  const orientationEventListenerRef = useRef<EventListener | null>(null)

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      orientationEventListenerRef.current = handleOrientation
      window.addEventListener("deviceorientation", handleOrientation)
    } else {
      setError("جهازك لا يدعم البوصلة")
    }
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, []) // Removed handleOrientation from dependencies

  const calculateQiblaDirection = async () => {
    setLoading(true)
    setError(null)

    try {
      let latitude, longitude
      if (manualLocation.latitude !== null && manualLocation.longitude !== null) {
        latitude = manualLocation.latitude
        longitude = manualLocation.longitude
      } else {
        try {
          // Try to get user's location
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              enableHighAccuracy: false,
            })
          })

          latitude = position.coords.latitude
          longitude = position.coords.longitude
        } catch (locationError) {
          console.error("Error getting location:", locationError)
          // Fallback to default location (Mecca)
          latitude = 21.4225
          longitude = 39.8262

          // Show a warning but continue with default location
          setError("تعذر الوصول إلى موقعك. سيتم استخدام موقع افتراضي للحساب.")
        }
      }

      // Coordinates of Kaaba in Mecca
      const kaabaLat = 21.4225
      const kaabaLong = 39.8262

      // Calculate Qibla direction
      const latDiff = kaabaLat - latitude
      const longDiff = kaabaLong - longitude

      // Convert to radians
      const latRad = latitude * (Math.PI / 180)
      const kaabaLatRad = kaabaLat * (Math.PI / 180)
      const longDiffRad = longDiff * (Math.PI / 180)

      // Calculate Qibla direction
      const y = Math.sin(longDiffRad)
      const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(longDiffRad)
      let qibla = Math.atan2(y, x) * (180 / Math.PI)

      // Normalize to 0-360
      qibla = (qibla + 360) % 360

      setQiblaDirection(qibla)
      setLoading(false)
    } catch (err) {
      console.error("Error calculating Qibla direction:", err)
      setError("حدث خطأ أثناء حساب اتجاه القبلة. يرجى المحاولة مرة أخرى.")
      setLoading(false)
    }
  }

  return (
    <Card className="rtl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">محدد القبلة</CardTitle>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: loading ? Number.POSITIVE_INFINITY : 0 }}
        >
          <Compass className="h-5 w-5 text-purple-500" />
        </motion.div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">تحديد اتجاه القبلة من موقعك الحالي أو أدخل الموقع يدوياً</p>

        {error && <div className="bg-amber-50 text-amber-600 p-3 rounded-md mb-4 text-sm">{error}</div>}

        <div className="flex flex-col items-center justify-center">
          <div className="mb-4">
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
              خط العرض
            </label>
            <input
              type="number"
              id="latitude"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setManualLocation({ ...manualLocation, latitude: Number.parseFloat(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
              خط الطول
            </label>
            <input
              type="number"
              id="longitude"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setManualLocation({ ...manualLocation, longitude: Number.parseFloat(e.target.value) })}
            />
          </div>

          {qiblaDirection !== null && (
            <div className="relative mb-6">
              <div className="w-48 h-48 rounded-full border-4 border-purple-100 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-purple-600"></div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-xs font-medium">N</div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-xs font-medium">S</div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 text-xs font-medium">W</div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 text-xs font-medium">E</div>
                </div>

                <motion.div
                  className="absolute top-1/2 left-1/2 w-40 h-1 bg-purple-600 origin-left"
                  style={{
                    rotate: compassHeading !== null ? qiblaDirection - compassHeading : qiblaDirection,
                  }}
                  animate={{ rotate: compassHeading !== null ? qiblaDirection - compassHeading : qiblaDirection }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="absolute right-0 -top-1 w-3 h-3 bg-purple-600 rounded-full"></div>
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <MapPin className="w-full h-full text-purple-600" />
                  </motion.div>
                </div>
              </div>

              <div className="text-center mt-2">
                <p className="text-sm font-medium">اتجاه القبلة: {Math.round(qiblaDirection)}°</p>
                {compassHeading !== null && (
                  <p className="text-xs text-muted-foreground">اتجاه البوصلة: {Math.round(compassHeading)}°</p>
                )}
              </div>
            </div>
          )}

          <Button onClick={calculateQiblaDirection} className="gap-2" disabled={loading}>
            <RotateCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {qiblaDirection === null ? "تحديد اتجاه القبلة" : "تحديث الاتجاه"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

