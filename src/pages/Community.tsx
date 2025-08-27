import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, User, Filter } from 'lucide-react';
import { CommunityItem } from '@/lib/types';
import rawCommunity from '@/data/community.json';
import { normalizeCommunity } from '@/lib/normalize';

const Community = () => {
  const [items, setItems] = useState<CommunityItem[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    document.title = 'Community - Fort Maner | Chicago Streetwear Culture';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Connect with the Fort Maner community in Chicago. Local events, street culture, and neighborhood activities for streetwear enthusiasts.');
    }

    setItems((rawCommunity as any[]).map(normalizeCommunity));
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.tags.includes(filter);
  });

  const uniqueTags = Array.from(new Set(items.flatMap(item => item.tags)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getKindIcon = (kind: string) => {
    switch (kind) {
      case 'event':
        return '📅';
      case 'video':
        return '🎥';
      default:
        return '📝';
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Community</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Fort Maner is more than streetwear—it's a community. Join us for local events, 
            workshops, and activities that celebrate Chicago's unique street culture.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            variant={filter === 'all' ? 'black' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            <Filter className="mr-2 h-4 w-4" />
            All
          </Button>
          {uniqueTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? 'black' : 'outline'}
              size="sm"
              onClick={() => setFilter(tag)}
              className="capitalize"
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Community Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} id={item.id} className="overflow-hidden border-stone-medium/20 luxury-glow group">
              {item.mediaUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-xs">
                    {getKindIcon(item.kind)} {item.kind.toUpperCase()}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {formatDate(item.date)}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                {item.excerpt && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                )}
                
                <div className="space-y-2">
                  {item.location && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {item.location}
                    </div>
                  )}
                  
                  {item.author && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="mr-1 h-3 w-3" />
                      {item.author}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-red-600 text-white rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-2">No community items found</h3>
            <p className="text-lg">
              {filter === 'all' 
                ? 'Check back soon for community updates and events.'
                : `No items found for "${filter}". Try selecting a different filter.`
              }
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 bg-stone-light/5 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Join the Community</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Stay connected with Fort Maner's Chicago community. Follow us for updates 
            on local events, workshops, and neighborhood activities.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="black">
              Follow on Instagram
            </Button>
            <Button variant="outline">
              Join Newsletter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
