'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define the type for a single shop
interface Shop {
  id: string;
  name: string;
  logo_image: string;
  name_kana: string;
  address: string;
  station_name: string;
  access: string;
  mobile_access: string;
  urls: { pc: string };
  photo: { pc: { l: string; m: string; s: string; } };
  open: string;
  close: string;
  genre: { name: string; catch: string };
  budget: { name: string; average: string };
  capacity: number;
  party_capacity: number;
  wifi: string;
  course: string;
  free_drink: string;
  free_food: string;
  private_room: string;
  horigotatsu: string;
  tatami: string;
  card: string;
  non_smoking: string;
  charter: string;
  parking: string;
  barrier_free: string;
  other_memo: string;
  shop_detail_memo: string;
}

// Define the type for a single review
interface Review {
  id: number;
  title: string;
  reviewer_name: string;
  is_gourmet_meister: boolean;
  body: string;
  created_at: string;
}

export default function RestaurantDetailPage() {
  const params = useParams();
  const { id } = params;
  const [restaurant, setRestaurant] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchDetailsAndReviews = async () => {
        setLoading(true);
        try {
          // Fetch restaurant details and reviews in parallel
          const [resDetails, resReviews] = await Promise.all([
            fetch(`/api/restaurants/${id}`),
            fetch(`/api/reviews/${id}`),
          ]);

          if (!resDetails.ok) throw new Error('Failed to fetch restaurant details');
          const dataDetails = await resDetails.json();
          if (dataDetails.shop && dataDetails.shop.length > 0) {
            setRestaurant(dataDetails.shop[0]);
          } else {
            throw new Error('Restaurant not found');
          }

          if (!resReviews.ok) throw new Error('Failed to fetch reviews');
          const dataReviews = await resReviews.json();
          setReviews(dataReviews);

        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
        setLoading(false);
      };
      fetchDetailsAndReviews();
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (!restaurant) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Restaurant not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-lg text-gray-400">{restaurant.name_kana}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image src={restaurant.photo.pc.l} alt={restaurant.name} width={600} height={400} className="rounded-lg shadow-lg w-full" />
          </div>
          <div className="space-y-4">
            <p>{restaurant.genre.catch}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{restaurant.genre.name}</Badge>
              <Badge variant="secondary">{restaurant.budget.name}</Badge>
            </div>
            <div>
              <h3 className="font-semibold">住所</h3>
              <p>{restaurant.address}</p>
            </div>
            <div>
              <h3 className="font-semibold">アクセス</h3>
              <p>{restaurant.access}</p>
            </div>
            <div>
              <h3 className="font-semibold">営業時間</h3>
              <p>{restaurant.open}</p>
              <p>Closed: {restaurant.close}</p>
            </div>
            <a href={restaurant.urls.pc} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">ホットペッパーで見る</Button>
            </a>
            <Link
            href={`/review/${restaurant.id}`}
            passHref
            className="block mt-4"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700">
              このお店のレビューを投稿する
            </Button>
          </Link>
          </div>
        </div>

        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2"><span className="font-semibold">Capacity:</span> {restaurant.capacity}</div>
            <div className="flex items-center gap-2"><span className="font-semibold">Max Party:</span> {restaurant.party_capacity}</div>
            <div className="flex items-center gap-2"><span className="font-semibold">Wi-Fi:</span> <Badge variant={restaurant.wifi === 'あり' ? 'default' : 'outline'}>{restaurant.wifi}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">Courses:</span> <Badge variant={restaurant.course === 'あり' ? 'default' : 'outline'}>{restaurant.course}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">All-you-can-drink:</span> <Badge variant={restaurant.free_drink === 'あり' ? 'default' : 'outline'}>{restaurant.free_drink}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">All-you-can-eat:</span> <Badge variant={restaurant.free_food === 'あり' ? 'default' : 'outline'}>{restaurant.free_food}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">Private Room:</span> <Badge variant={restaurant.private_room === 'あり' ? 'default' : 'outline'}>{restaurant.private_room}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">Horigotatsu:</span> <Badge variant={restaurant.horigotatsu === 'あり' ? 'default' : 'outline'}>{restaurant.horigotatsu}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">Tatami:</span> <Badge variant={restaurant.tatami === 'あり' ? 'default' : 'outline'}>{restaurant.tatami}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">Card Payment:</span> <Badge variant={restaurant.card === '利用可' ? 'default' : 'outline'}>{restaurant.card}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">Non-Smoking:</span> <Badge>{restaurant.non_smoking}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">Charter:</span> <Badge>{restaurant.charter}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">Parking:</span> <Badge>{restaurant.parking}</Badge></div>
            <div className="flex items-center gap-2"><span className="font-semibold">Barrier-Free:</span> <Badge>{restaurant.barrier_free}</Badge></div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>内部レビュー</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="p-4 rounded-lg bg-gray-700/50 border border-gray-600">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback>{review.reviewer_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-lg">{review.title}</h4>
                      <div className="flex items-center text-sm text-gray-400">
                        <span>{review.reviewer_name}</span>
                        {review.is_gourmet_meister && (
                          <Badge variant="outline" className="ml-2 border-amber-400 text-amber-400">グルメマイスター</Badge>
                        )}
                      </div>
                    </div>
                    <time className="text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{review.body}</p>
                </div>
              ))
            ) : (
              <p>まだ内部レビューはありません。</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
