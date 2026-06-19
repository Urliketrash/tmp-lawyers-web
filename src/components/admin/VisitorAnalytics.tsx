"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type VisitorLog = {
  id: string;
  ip_address: string;
  device_type: string;
  os: string;
  browser: string;
  path: string;
  referrer: string;
  created_at: string;
  device_brand?: string;
  location?: string;
};

export default function VisitorAnalytics() {
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("30d");

  useEffect(() => {
    const fetchVisitorLogs = async () => {
      setLoading(true);
      try {
        const days = timeRange === "7d" ? 7 : 30;
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);

        const { data, error } = await supabase
          .from("visitor_logs")
          .select("*")
          .gte("created_at", cutoffDate.toISOString())
          .order("created_at", { ascending: false });

        if (error) throw error;
        setLogs(data || []);
      } catch (err) {
        console.error("Error fetching visitor logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorLogs();
  }, [timeRange]);

  // Calculations
  const totalPageviews = logs.length;
  const uniqueVisitors = new Set(logs.map((log) => log.ip_address)).size;

  // Device stats
  const devices = logs.reduce((acc: Record<string, number>, log) => {
    const dev = log.device_type || "Desktop";
    acc[dev] = (acc[dev] || 0) + 1;
    return acc;
  }, {});

  const deviceData = [
    { name: "Desktop", count: devices["Desktop"] || 0, color: "bg-tmp-gold" },
    { name: "Mobile", count: devices["Mobile"] || 0, color: "bg-green-500" },
    { name: "Tablet", count: devices["Tablet"] || 0, color: "bg-blue-500" },
  ];

  const totalDevices = deviceData.reduce((sum, item) => sum + item.count, 0);

  // Group by Date for Daily chart
  const getDailyData = () => {
    const days = timeRange === "7d" ? 7 : 30;
    const dailyMap = new Map<string, number>();

    // Initialize map with last N days
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      dailyMap.set(dateStr, 0);
    }

    // Populate counts
    logs.forEach((log) => {
      const dateStr = new Date(log.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      });
      if (dailyMap.has(dateStr)) {
        dailyMap.set(dateStr, (dailyMap.get(dateStr) || 0) + 1);
      }
    });

    return Array.from(dailyMap.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  };

  const dailyData = getDailyData();
  const maxDailyCount = Math.max(...dailyData.map((d) => d.count), 1);

  // Top paths
  const paths = logs.reduce((acc: Record<string, number>, log) => {
    acc[log.path] = (acc[log.path] || 0) + 1;
    return acc;
  }, {});
  const topPaths = Object.entries(paths)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-white/10 rounded mb-4"></div>
          <p className="text-gray-500 text-xs tracking-widest">LOADING ANALYTICS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif italic text-white">Visitor Analytics</h2>
          <p className="text-gray-400 text-sm mt-1">Real-time website traffic metrics.</p>
        </div>
        <div className="flex bg-white/5 border border-white/10 rounded p-1">
          <button
            onClick={() => setTimeRange("7d")}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-colors ${
              timeRange === "7d" ? "bg-tmp-gold text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange("30d")}
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded transition-colors ${
              timeRange === "30d" ? "bg-tmp-gold text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-tmp-black border border-white/10 p-6 rounded-lg">
          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">
            Total Pageviews
          </h3>
          <p className="text-4xl text-white font-serif italic">{totalPageviews}</p>
          <p className="text-gray-500 text-xs mt-2">
            Total page requests in the last {timeRange === "7d" ? "7" : "30"} days.
          </p>
        </div>
        <div className="bg-tmp-black border border-white/10 p-6 rounded-lg">
          <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">
            Unique Visitors (IPs)
          </h3>
          <p className="text-4xl text-tmp-gold font-serif italic">{uniqueVisitors}</p>
          <p className="text-gray-500 text-xs mt-2">
            Unique IP addresses that visited the site.
          </p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Traffic Chart */}
        <div className="lg:col-span-2 bg-tmp-black border border-white/10 p-6 rounded-lg flex flex-col">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
            Traffic Trend (Pageviews)
          </h3>
          <div className="flex-1 flex items-end justify-between h-64 gap-1 pt-6 px-2 border-b border-l border-white/10">
            {dailyData.map((d, index) => {
              const heightPercent = (d.count / maxDailyCount) * 85 + 5; // Min 5% height
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer"
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-black/90 border border-white/20 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
                    <span className="text-tmp-gold font-bold">{d.count} views</span> | {d.date}
                  </div>
                  {/* Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[14px] bg-white/10 group-hover:bg-tmp-gold rounded-t transition-all duration-300"
                  ></div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[9px] text-gray-500 mt-2 px-2">
            <span>{dailyData[0]?.date}</span>
            <span>{dailyData[Math.floor(dailyData.length / 2)]?.date}</span>
            <span>{dailyData[dailyData.length - 1]?.date}</span>
          </div>
        </div>

        {/* Device & Top Pages */}
        <div className="space-y-6">
          {/* Device Distribution */}
          <div className="bg-tmp-black border border-white/10 p-6 rounded-lg">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
              Devices Used
            </h3>
            <div className="space-y-4">
              {deviceData.map((item) => {
                const percentage =
                  totalDevices > 0 ? Math.round((item.count / totalDevices) * 100) : 0;
                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-300 font-medium">{item.name}</span>
                      <span className="text-gray-400">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percentage}%` }}
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-tmp-black border border-white/10 p-6 rounded-lg">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
              Top Visited Pages
            </h3>
            <div className="space-y-3">
              {topPaths.map(([path, count]) => (
                <div key={path} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-300 font-mono break-all">{path}</span>
                  <span className="text-tmp-gold font-bold px-2 py-0.5 bg-tmp-gold/10 rounded text-[10px]">
                    {count}
                  </span>
                </div>
              ))}
              {topPaths.length === 0 && (
                <p className="text-gray-500 text-xs italic">No page data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Logs Table */}
      <div className="bg-tmp-black border border-white/10 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Recent Visitor Logs
          </h3>
          <span className="text-[10px] text-gray-500 uppercase">Showing last 100 logs</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-gray-400">
                <th className="p-4 font-bold uppercase">Visitor IP</th>
                <th className="p-4 font-bold uppercase">Page (Path)</th>
                <th className="p-4 font-bold uppercase">Browser & OS</th>
                <th className="p-4 font-bold uppercase">Device</th>
                <th className="p-4 font-bold uppercase">Device Model</th>
                <th className="p-4 font-bold uppercase">Location/Domicile</th>
                <th className="p-4 font-bold uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {logs.slice(0, 100).map((log) => {
                const date = new Date(log.created_at).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-medium">{log.ip_address}</td>
                    <td className="p-4 font-mono text-gray-400 break-all">{log.path}</td>
                    <td className="p-4">
                      {log.browser} on {log.os}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.device_type === "Mobile"
                            ? "bg-green-500/10 text-green-400"
                            : log.device_type === "Tablet"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-tmp-gold/10 text-tmp-gold"
                        }`}
                      >
                        {log.device_type}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-gray-300 font-medium">
                      {log.device_brand || "-"}
                    </td>
                    <td className="p-4 text-tmp-gold font-medium">
                      {log.location || "Localhost"}
                    </td>
                    <td className="p-4 text-gray-400">{date}</td>
                  </tr>
                );
              })}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 italic">
                    No visitor logs found. Start exploring the website to populate data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
