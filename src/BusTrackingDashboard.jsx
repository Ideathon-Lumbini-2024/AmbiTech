import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Bus, MapPin, Clock, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Mock bus data with coordinates
const busData = [
  { 
    id: "Bus-001", 
    route: "Kalika Secondary School", 
    status: "On Time", 
    passengers: 24, 
    nextStop: "Central Station",
    position: [27.681959, 83.465665],
    lastUpdate: "2 mins ago"
  },
  { 
    id: "Bus-002", 
    route: "Kharjyang", 
    status: "Delayed", 
    passengers: 18, 
    nextStop: "Terminal 1",
    position: [27.982932, 83.317620    ],
    lastUpdate: "1 min ago"
  },
  { 
    id: "Bus-003", 
    route: "University Line", 
    status: "On Time", 
    passengers: 32, 
    nextStop: "Science Building",
    position: [27.689249, 83.443633],
    lastUpdate: "Just now"
  },
  {
    id: "Bus-004",
    route: "Kalika Secondary School",
    status: "On Time",
    passengers: 24,
    nextStop: "Central Station",
    position: [27.681959, 83.465665],
    lastUpdate: "2 mins ago"
  }
];

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: "https://static-00.iconduck.com/assets.00/bus-icon-2048x2048-94s1152n.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const BusTrackingDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  const [selectedBus, setSelectedBus] = useState(null);
  const mapCenter = [27.681959, 83.465665];

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">LiveTrack Transit</h1>
        <p className="text-gray-600">Real-time bus tracking system</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by route or bus number"
            className="pl-8"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <MapPin className="mr-2 h-4 w-4" /> Find Nearest Bus
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Map View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[500px] rounded-lg overflow-hidden">
              <MapContainer 
                center={mapCenter} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {busData.map((bus) => (
                  <Marker
                    key={bus.id}
                    position={bus.position}
                    icon={busIcon}
                    eventHandlers={{
                      click: () => handleBusClick(bus),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold">{bus.id}</h3>
                        <p className="text-sm">Route: {bus.route}</p>
                        <p className="text-sm">Status: {bus.status}</p>
                        <p className="text-sm">Next Stop: {bus.nextStop}</p>
                        <p className="text-sm text-gray-500">Last updated: {bus.lastUpdate}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bus Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Active Buses</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="list" className="flex-1">List View</TabsTrigger>
                <TabsTrigger value="stats" className="flex-1">Statistics</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <div className="space-y-4">
                  {busData.map((bus) => (
                    <Card 
                      key={bus.id} 
                      className={`bg-white cursor-pointer transition-colors ${
                        selectedBus?.id === bus.id ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => handleBusClick(bus)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Bus className="h-5 w-5 mr-2 text-blue-600" />
                            <span className="font-medium">{bus.id}</span>
                          </div>
                          <Badge 
                            variant={bus.status === "On Time" ? "default" : "destructive"}
                          >
                            {bus.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            Route: {bus.route}
                          </div>
                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 mr-2" />
                            Next Stop: {bus.nextStop}
                          </div>
                          <div className="flex items-center mt-2">
                            <Info className="h-4 w-4 mr-2" />
                            Passengers: {bus.passengers}
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Last updated: {bus.lastUpdate}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="stats">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-2xl font-bold text-blue-600">3</p>
                        <p className="text-sm text-gray-600">Active Buses</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-2xl font-bold text-green-600">74</p>
                        <p className="text-sm text-gray-600">Total Passengers</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusTrackingDashboard;