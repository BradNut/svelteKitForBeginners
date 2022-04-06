import type { RequestHandler } from "@sveltejs/kit";
import prisma from "$root/lib/prisma";
import { timePosted } from "$root/lib/date";

export const get: RequestHandler = async () => {
  const data = await prisma.tweet.findMany({
    include: { user: true },
    orderBy: { posted: 'desc' }
  })

  const liked = await prisma.liked.findMany({
    where: { userId: 1 },
    select: { tweetId: true }
  })

  const likedTweets = Object.keys(liked).map(
    key => liked[key].tweetId
  )

  const tweets = data.map(tweet => {
    return {
      id: tweet.id,
      content: tweet.content,
      likes: tweet.likes,
      posted: timePosted(tweet.posted),
      url: tweet.url,
      avatar: tweet.user.avatar,
      handle: tweet.user.handle,
      name: tweet.user.name,
      liked: likedTweets.includes(tweet.id)
    }
  })

  if (!tweets) {
    return { status: 400 }
  }

  return {
    headers: { 'Content-Type': 'application/json ' },
    status: 200,
    body: { tweets }
  }
}

export const post: RequestHandler = async ({ request }) => {
  const form = await request.formData()
  const tweet = String(form.get('tweet'))

  if (tweet.length > 140) {
    return {
      status: 400,
      body: 'Maximum Tweet length exceeded.',
      headers: { location: '/home' }
    }
  }

  await prisma.tweet.create({
    data: {
      posted: new Date(),
      url: Math.random().toString(16).slice(2),
      content: tweet,
      likes: 0,
      user: { connect: { id: 1 } }
    }
  })

  return {}
}