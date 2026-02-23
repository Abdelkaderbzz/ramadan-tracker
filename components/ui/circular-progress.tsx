"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface CircularProgressBarProps {
  percentage: number
  color: string
  size?: number
  strokeWidth?: number
  showAnimation?: boolean
  milestones?: number[]
}

export function CircularProgressBar({
  percentage,
  color,
  size = 100,
  strokeWidth = 8,
  showAnimation = true,
  milestones = [],
}: CircularProgressBarProps) {
  const [progress, setProgress] = useState(0)

  
  const getColors = (colorName: string) => {
    const colorMap: Record<string, { main: string; light: string; dark: string }> = {
      purple: { main: "#8b5cf6", light: "#c4b5fd", dark: "#6d28d9" },
      blue: { main: "#3b82f6", light: "#93c5fd", dark: "#2563eb" },
      emerald: { main: "#10b981", light: "#6ee7b7", dark: "#059669" },
      orange: { main: "#f97316", light: "#fdba74", dark: "#ea580c" },
      rose: { main: "#f43f5e", light: "#fda4af", dark: "#e11d48" },
    }

    return colorMap[colorName] || colorMap.purple
  }

  const colors = getColors(color)

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setProgress(percentage)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setProgress(percentage)
    }
  }, [percentage, showAnimation])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const dash = (progress * circumference) / 100

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-800"
        />

        {}
        {milestones.map((milestone, index) => {
          const milestoneAngle = (milestone / 100) * 360 - 90
          const milestoneX = size / 2 + radius * Math.cos((milestoneAngle * Math.PI) / 180)
          const milestoneY = size / 2 + radius * Math.sin((milestoneAngle * Math.PI) / 180)

          return (
            <circle
              key={index}
              cx={milestoneX}
              cy={milestoneY}
              r={strokeWidth / 3}
              fill={colors.light}
              className="opacity-70"
            />
          )
        })}

        {}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.main}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {}
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.light} />
            <stop offset="100%" stopColor={colors.dark} />
          </linearGradient>
        </defs>

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#gradient-${color})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference, opacity: 0.3 }}
          animate={{ strokeDashoffset: circumference - dash, opacity: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      {}
      {progress > 0 && (
        <motion.div
          className="absolute"
          style={{
            width: strokeWidth * 1.5,
            height: strokeWidth * 1.5,
            borderRadius: "50%",
            backgroundColor: colors.main,
            boxShadow: `0 0 10px ${colors.main}`,
            top: size / 2,
            left: size / 2,
            marginLeft: -strokeWidth * 0.75,
            marginTop: -strokeWidth * 0.75,
            transformOrigin: `${strokeWidth * 0.75}px ${strokeWidth * 0.75}px`,
          }}
          initial={{ rotate: -90 }}
          animate={{ rotate: progress * 3.6 - 90 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}

      {}
      <div
        className="absolute inset-0 flex items-center justify-center text-lg font-bold"
        style={{ color: colors.main }}
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  )
}

