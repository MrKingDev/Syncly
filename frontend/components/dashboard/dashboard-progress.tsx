"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

// Progress Chart
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

const PriorityBreakdown = [
  { label: "High", value: 3 },
  { label: "Medium", value: 6 },
  { label: "Low", value: 3 },
  { label: "Urgent", value: 0 },
]

const chartData = [
  { browser: "safari", progress: 33, fill: "var(--color-safari)" },
]
const chartConfig = {
  progress: {
    label: "Progress",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const DashboardProgress = () => {
  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Work at a glance
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Chart */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-62.5 w-full max-w-62.5"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            outerRadius={90}
            innerRadius={80}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[90, 80]}
            />

            <RadialBar dataKey="progress" background cornerRadius={10} />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].progress.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Completed
                        </tspan>
                      </text>
                    )
                  }

                  return null
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>

        {/* Task Status */}
        <div className="flex flex-col gap-5">
          {[
            { label: "To do", value: 3, color: "border-stone-500" },
            { label: "In progress", value: 5, color: "border-orange-500" },
            { label: "Done", value: 4, color: "border-amber-300" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex w-full items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`size-2.5 shrink-0 rounded-full border-2 ${color}`}
                />
                <span className="text-muted-foreground">{label}</span>
              </div>

              <span className="font-semibold tabular-nums">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Priority Breakdown */}
      <CardFooter className="flex flex-col items-stretch gap-4 border-t pt-5">
        <CardTitle className="text-base font-semibold">
          Priority Breakdown
        </CardTitle>

        <div className="flex w-full flex-col gap-3">
          {PriorityBreakdown.map(({ label, value }) => (
            <div
              key={label}
              className="flex w-full items-center justify-between gap-4 text-sm"
            >
              <p className="text-muted-foreground">{label}</p>
              <p className="font-semibold tabular-nums">{value}</p>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default DashboardProgress
