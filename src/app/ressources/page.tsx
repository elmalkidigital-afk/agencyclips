'use client';

import { useState, useMemo } from 'react';
import { BookOpen, Search, BookMarked, Moon, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Hadiths } from '@/lib/hadiths';
import { VersetsCoraniques } from '@/lib/versets-coraniques';

export default function RessourcesPage() {
  const [search, setSearch] = useState('');

  const filteredHadiths = useMemo(() => {
    if (!search.trim()) return Hadiths.slice(0, 50);
    const q = search.toLowerCase();
    return Hadiths.filter(
      h => h.content.toLowerCase().includes(q) || h.source.toLowerCase().includes(q)
    ).slice(0, 50);
  }, [search]);

  const filteredVersets = useMemo(() => {
    if (!search.trim()) return VersetsCoraniques.slice(0, 50);
    const q = search.toLowerCase();
    return VersetsCoraniques.filter(
      v => v.content.toLowerCase().includes(q) || v.source.toLowerCase().includes(q)
    ).slice(0, 50);
  }, [search]);

  return (
    <div className="min-h-screen bg-background p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center pt-6 pb-2">
          <h1 className="text-2xl font-bold text-hikma-gradient inline-block">Ressources</h1>
          <p className="text-muted-foreground text-sm mt-1">Bibliothèque de sagesse islamique</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un hadith, verset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="hadiths" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hadiths" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              Hadiths
            </TabsTrigger>
            <TabsTrigger value="coran" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Coran
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hadiths">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-3 pr-4">
                {filteredHadiths.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Aucun hadith trouvé.</p>
                ) : (
                  filteredHadiths.map((hadith, i) => (
                    <Card key={i} className="border-border/50">
                      <CardContent className="p-4">
                        <p className="text-sm leading-relaxed">{hadith.content}</p>
                        <p className="text-xs text-primary/80 mt-2 font-medium italic">— {hadith.source}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="coran">
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-3 pr-4">
                {filteredVersets.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Aucun verset trouvé.</p>
                ) : (
                  filteredVersets.map((verset, i) => (
                    <Card key={i} className="border-border/50">
                      <CardContent className="p-4">
                        <p className="text-sm leading-relaxed">{verset.content}</p>
                        <p className="text-xs text-primary/80 mt-2 font-medium italic">— {verset.source}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
