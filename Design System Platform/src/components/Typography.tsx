import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Plus,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Copy,
  Edit,
} from "lucide-react";

export function Typography() {
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [fontSize, setFontSize] = useState([16]);
  const [lineHeight, setLineHeight] = useState([1.5]);
  const [letterSpacing, setLetterSpacing] = useState([0]);

  const typographyScale = [
    { name: "Display Large", size: "57px", weight: "400", lineHeight: "64px", usage: 8 },
    { name: "Display Medium", size: "45px", weight: "400", lineHeight: "52px", usage: 12 },
    { name: "Display Small", size: "36px", weight: "400", lineHeight: "44px", usage: 18 },
    { name: "Headline Large", size: "32px", weight: "500", lineHeight: "40px", usage: 25 },
    { name: "Headline Medium", size: "28px", weight: "500", lineHeight: "36px", usage: 34 },
    { name: "Headline Small", size: "24px", weight: "500", lineHeight: "32px", usage: 42 },
    { name: "Title Large", size: "22px", weight: "500", lineHeight: "28px", usage: 56 },
    { name: "Title Medium", size: "16px", weight: "500", lineHeight: "24px", usage: 78 },
    { name: "Title Small", size: "14px", weight: "500", lineHeight: "20px", usage: 89 },
    { name: "Body Large", size: "16px", weight: "400", lineHeight: "24px", usage: 134 },
    { name: "Body Medium", size: "14px", weight: "400", lineHeight: "20px", usage: 167 },
    { name: "Body Small", size: "12px", weight: "400", lineHeight: "16px", usage: 92 },
    { name: "Label Large", size: "14px", weight: "500", lineHeight: "20px", usage: 78 },
    { name: "Label Medium", size: "12px", weight: "500", lineHeight: "16px", usage: 145 },
    { name: "Label Small", size: "11px", weight: "500", lineHeight: "16px", usage: 67 },
  ];

  const fontFamilies = [
    { name: "Inter", category: "Sans Serif", usage: 89 },
    { name: "Roboto", category: "Sans Serif", usage: 67 },
    { name: "Open Sans", category: "Sans Serif", usage: 45 },
    { name: "Lato", category: "Sans Serif", usage: 32 },
    { name: "Poppins", category: "Sans Serif", usage: 28 },
    { name: "Montserrat", category: "Sans Serif", usage: 23 },
  ];

  const TypographyCard = ({ style }: { style: any }) => (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground">
              {style.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
              <span>{style.size}</span>
              <span>Weight {style.weight}</span>
              <span>LH {style.lineHeight}</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {style.usage} uses
          </Badge>
        </div>
        
        <div 
          className="mb-4"
          style={{
            fontSize: style.size,
            fontWeight: style.weight,
            lineHeight: style.lineHeight,
          }}
        >
          The quick brown fox jumps
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Copy className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Edit className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const FontFamilyCard = ({ font }: { font: any }) => (
    <Card className="group hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium" style={{ fontFamily: font.name }}>
              {font.name}
            </h3>
            <p className="text-sm text-muted-foreground">{font.category}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {font.usage} uses
          </Badge>
        </div>
        
        <div className="space-y-2" style={{ fontFamily: font.name }}>
          <div className="text-2xl">Aa Bb Cc</div>
          <div className="text-sm text-muted-foreground">
            The quick brown fox jumps over the lazy dog
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Typography</h1>
          <p className="text-muted-foreground">
            Define and manage your typography system
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Style
        </Button>
      </div>

      {/* Typography Tabs */}
      <Tabs defaultValue="scale" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-96">
          <TabsTrigger value="scale" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Type Scale
          </TabsTrigger>
          <TabsTrigger value="fonts" className="flex items-center gap-2">
            <AlignLeft className="h-4 w-4" />
            Font Families
          </TabsTrigger>
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Style Editor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scale" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {typographyScale.map((style, index) => (
              <TypographyCard key={index} style={style} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fonts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fontFamilies.map((font, index) => (
              <FontFamilyCard key={index} font={font} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="editor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Style Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Typography Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Font Family</label>
                  <Select value={selectedFont} onValueChange={setSelectedFont}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem key={font.name} value={font.name}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center justify-between">
                    Font Size
                    <span className="text-muted-foreground">{fontSize[0]}px</span>
                  </label>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    min={8}
                    max={72}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center justify-between">
                    Line Height
                    <span className="text-muted-foreground">{lineHeight[0]}</span>
                  </label>
                  <Slider
                    value={lineHeight}
                    onValueChange={setLineHeight}
                    min={1}
                    max={3}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center justify-between">
                    Letter Spacing
                    <span className="text-muted-foreground">{letterSpacing[0]}px</span>
                  </label>
                  <Slider
                    value={letterSpacing}
                    onValueChange={setLetterSpacing}
                    min={-2}
                    max={2}
                    step={0.1}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>

                <Button className="w-full">Save Style</Button>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div
                    style={{
                      fontFamily: selectedFont,
                      fontSize: `${fontSize[0]}px`,
                      lineHeight: lineHeight[0],
                      letterSpacing: `${letterSpacing[0]}px`,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div>Font: {selectedFont}</div>
                    <div>Size: {fontSize[0]}px</div>
                    <div>Line Height: {lineHeight[0]}</div>
                    <div>Letter Spacing: {letterSpacing[0]}px</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}