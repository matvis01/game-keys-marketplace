export type GameType = {
  id: number
  slug: string
  name: string
  name_original: string
  description: string
  metacritic: null | number
  metacritic_platforms: any[] // You can define a more specific type if needed
  released: string
  tba: boolean
  updated: string
  background_image: string
  background_image_additional: string
  website: string
  rating: number
  rating_top: number
  ratings: {
    id: number
    title: string
    count: number
    percent: number
  }[]
  reactions: {
    [key: string]: number
  }
  added: number
  added_by_status: {
    yet: number
    owned: number
    beaten: number
    toplay: number
    dropped: number
  }
  playtime: number
  screenshots_count: number
  movies_count: number
  creators_count: number
  achievements_count: number
  parent_achievements_count: number
  reddit_url: string
  reddit_name: string
  reddit_description: string
  reddit_logo: string
  reddit_count: number
  twitch_count: number
  youtube_count: number
  reviews_text_count: number
  ratings_count: number
  suggestions_count: number
  alternative_names: string[]
  metacritic_url: string
  parents_count: number
  additions_count: number
  game_series_count: number
  user_game: null | any // Define a more specific type if needed
  reviews_count: number
  saturated_color: string
  dominant_color: string
  parent_platforms: {
    platform: {
      id: number
      name: string
      slug: string
    }
  }[]
  platforms: {
    platform: {
      id: number
      name: string
      slug: string
      image: null | string // Define a more specific type if needed
      year_end: null | number // Define a more specific type if needed
      year_start: null | number // Define a more specific type if needed
      games_count: number
      image_background: string
    }
    released_at: string | null
    requirements: any // You can define a more specific type if needed
  }[]
  stores: {
    id: number
    url: string
    store: {
      id: number
      name: string
      slug: string
      domain: string
      games_count: number
      image_background: string
    }
  }[]
  developers: {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }[]
  genres: {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }[]
  tags: {
    id: number
    name: string
    slug: string
    language: string
    games_count: number
    image_background: string
  }[]
  publishers: {
    id: number
    name: string
    slug: string
    games_count: number
    image_background: string
  }[]
  esrb_rating: {
    id: number
    name: string
    slug: string
  }
  clip: null | any // Define a more specific type if needed
  description_raw: string
}

export interface Screenshot {
  id: number
  image: string
  width: number
  height: number
  is_deleted: boolean
}

export interface Review {
  id: number
  user: {
    username: string
  }
  game: number
  text: string
  text_preview: string
  text_previews: string[]
  text_attachments: number
  rating: number
  reactions: any[] // Define a more specific type if needed
  created: string
  edited: string
  likes_count: number
  likes_positive: number
  likes_rating: number
  comments_count: number
  comments_parent_count: number
  posts_count: number
  share_image: string
  is_text: boolean
  external_avatar: string
  comments: {
    count: number
    results: any[] // Define a more specific type if needed
  }
  can_delete: boolean
  external_store: {
    id: number
    name: string
    domain: string
    slug: string
    games_count: number
    image_background: string
  }
  external_lang: string
  external_author: string
  external_source: string
  is_external: boolean
}
