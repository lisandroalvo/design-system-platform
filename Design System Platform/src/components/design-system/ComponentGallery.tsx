import React, { useState, useMemo } from 'react';
import { ComponentType } from './types';
import { componentOptions } from './component-data';
import { createCategories } from './category-data';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  TrendingUp, 
  ArrowLeft,
  Grid3X3,
  List,
  Star,
  Clock,
  Layers
} from 'lucide-react';

interface ComponentGalleryProps {
  onComponentSelect: (type: ComponentType, name: string) => void;
  onCancel: () => void;
}

export const ComponentGallery: React.FC<ComponentGalleryProps> = ({
  onComponentSelect,
  onCancel
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'alphabetical' | 'popular' | 'new'>('popular');

  // Create categories based on component options
  const categoryData = useMemo(() => createCategories(componentOptions), []);

  // Filter and sort components
  const filteredComponents = useMemo(() => {
    let filtered = componentOptions.filter(component => {
      const matchesSearch = component.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort components
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.label.localeCompare(b.label);
        case 'popular':
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return a.label.localeCompare(b.label);
        case 'new':
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return a.label.localeCompare(b.label);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleComponentSelect = (component: any) => {
    onComponentSelect(component.value, component.label);
  };

  return (
    <div className="h-full flex bg-white">
      {/* Compact Sidebar with Categories */}
      <div className="w-48 border-r border-gray-200 bg-gray-50 flex flex-col">
        {/* Compact Header - Same size as main nav */}
        <div className="px-3 py-2 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCancel}
              className="h-7 w-7 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-gray-900 text-sm truncate">Component Gallery</h1>
              <p className="text-xs text-gray-600">{componentOptions.length} components</p>
            </div>
          </div>

          {/* Compact Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 h-7 text-xs"
            />
          </div>
        </div>

        {/* Categories */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 px-1">Categories</h3>
            {categoryData.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full justify-start h-7 px-2 text-xs ${
                  selectedCategory === category.id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="text-xs">{category.icon}</div>
                  <span className="truncate flex-1">{category.label}</span>
                  {category.count > 0 && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs h-4 px-1 ${
                        selectedCategory === category.id 
                          ? 'bg-blue-500 text-white border-blue-400' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {category.count}
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>

          <Separator className="my-3" />

          {/* Sort Options */}
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 px-1">Sort By</h3>
            {[
              { id: 'popular', label: 'Popular', icon: <TrendingUp className="w-3 h-3" /> },
              { id: 'new', label: 'New', icon: <Sparkles className="w-3 h-3" /> },
              { id: 'alphabetical', label: 'A-Z', icon: <List className="w-3 h-3" /> }
            ].map((sort) => (
              <Button
                key={sort.id}
                variant={sortBy === sort.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy(sort.id as any)}
                className={`w-full justify-start h-7 px-2 text-xs ${
                  sortBy === sort.id 
                    ? 'bg-gray-600 text-white hover:bg-gray-700' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {sort.icon}
                  <span>{sort.label}</span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Compact Top Bar - Same height as other views */}
        <div className="border-b border-gray-200 px-4 py-2 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">
                {selectedCategory === 'all' ? 'All Components' : categoryData.find(c => c.id === selectedCategory)?.label}
              </h2>
              <p className="text-xs text-gray-600">
                {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-7 w-7 p-0"
              >
                <Grid3X3 className="w-3 h-3" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-7 w-7 p-0"
              >
                <List className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Component Grid */}
        <ScrollArea className="flex-1 p-4">
          {filteredComponents.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4' 
              : 'space-y-3'
            }>
              {filteredComponents.map((component, index) => (
                <div key={component.value}>
                  {viewMode === 'grid' ? (
                    // Grid Card
                    <Card 
                      className="cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300"
                      onClick={() => handleComponentSelect(component)}
                    >
                      <CardContent className="p-4">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                              <div className="text-blue-600 text-sm">
                                {component.icon}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm truncate">
                                {component.label}
                              </h3>
                              <p className="text-xs text-gray-500 line-clamp-2">
                                {component.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            {component.isNew && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200 px-1.5 py-0.5">
                                New
                              </Badge>
                            )}
                            {component.isPopular && (
                              <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200 px-1.5 py-0.5">
                                Popular
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Preview */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="scale-75 origin-center">
                            {component.preview}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {component.tags.slice(0, 2).map((tag) => (
                            <Badge 
                              key={tag}
                              variant="outline" 
                              className="text-xs bg-gray-50 border-gray-200 text-gray-600 px-2 py-0.5"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {component.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs bg-gray-50 border-gray-200 text-gray-500 px-2 py-0.5">
                              +{component.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="capitalize">{component.complexity || 'Simple'}</span>
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {component.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    // List Item
                    <Card 
                      className="cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300"
                      onClick={() => handleComponentSelect(component)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="text-blue-600">
                              {component.icon}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">
                                {component.label}
                              </h3>
                              {component.isNew && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                                  New
                                </Badge>
                              )}
                              {component.isPopular && (
                                <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                              {component.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {component.tags.slice(0, 3).map((tag) => (
                                <Badge 
                                  key={tag}
                                  variant="outline" 
                                  className="text-xs bg-gray-50 border-gray-200 text-gray-600"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-gray-500 flex-shrink-0">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span className="capitalize">{component.complexity || 'Simple'}</span>
                            </div>
                            <Badge variant="secondary" className="capitalize">
                              {component.category}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No components found</h3>
              <p className="text-gray-500 max-w-md">
                Try adjusting your search terms or selecting a different category to find the components you're looking for.
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="mt-4"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};