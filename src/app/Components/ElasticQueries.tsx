export const ElasticQueriesList = [
    {
        "queryNumber": 0,
        "queryDescription": "Romantic dinner recipes",
        "query":
        {
            "query": {
                "bool": {
                    "must": [
                        {
                            "range": {
                                "RecipeServings": {
                                    "gte": 2,
                                    "lte": 3
                                }
                            }
                        }
                    ],
                    "should": [
                        {
                            "nested": {
                                "path": "Reviews",
                                "query": {
                                    "match": {
                                        "Reviews.Review": {
                                            "query": "romantic",
                                            "boost": 2
                                        }
                                    }
                                }
                            }
                        },
                        {
                            "match": {
                                "Keywords": {
                                    "query": "romantic",
                                    "boost": 2
                                }
                            }
                        },
                        {
                            "match": {
                                "Description": {
                                    "query": "romantic",
                                    "boost": 2
                                }
                            }
                        },
                        {
                            "range": {
                                "AggregatedRating": {
                                    "gte": 3.5
                                }
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        "queryNumber": 1,
        "queryDescription": "Recipes for a party with a lot of servings",
        "query":
        {
            "query": {
                "bool": {
                    "must": [
                        {
                            "range": {
                                "RecipeServings": {
                                    "gte": 10
                                }
                            }
                        }
                    ],
                    "should": [
                        {
                            "match": {
                                "Keywords": {
                                    "query": "party, large groups, gathering, celebration, event, buffet",
                                    "operator": "or",
                                    "boost": 2
                                }
                            }
                        },
                        {
                            "match": {
                                "RecipeCategory": {
                                    "query": "Dessert, Appetizer, Main, Party, Buffet",
                                    "operator": "or",
                                    "boost": 1.5
                                }
                            }
                        },
                        {
                            "match": {
                                "Description": {
                                    "query": "party, large groups, gathering, celebration, event",
                                    "operator": "or",
                                    "boost": 1.5
                                }
                            }
                        },
                        {
                            "nested": {
                                "path": "Reviews",
                                "query": {
                                    "match": {
                                        "Reviews.Review": {
                                            "query": "party, celebration, gathering, event, buffet",
                                            "operator": "or",
                                            "boost": 3
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    "minimum_should_match": 1
                }
            }
        }
    },
    {
        "queryNumber": 2,
        "queryDescription": "Recipes without an oven with microwave",
        "query": {
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "RecipeInstructions": "microwave"
                            }
                        }
                    ],
                    "must_not": [
                        {
                            "match": {
                                "Keywords": {
                                    "query": "oven pan pot fryer",
                                    "operator": "or"
                                }
                            }
                        },
                        {
                            "match": {
                                "RecipeInstructions": {
                                    "query": "oven pan pot fryer",
                                    "operator": "or"
                                }
                            }
                        }
                    ],
                    "should": [
                        {
                            "match": {
                                "Keywords": "microwave"
                            }
                        },
                        {
                            "nested": {
                                "path": "Reviews",
                                "query": {
                                    "match": {
                                        "Reviews.Review": "microwave"
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        "queryNumber": 3,
        "queryDescription": "Recipes with whatever I have in my fridge",
        "query":
        {
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "RecipeIngredientParts": {
                                    "query": "chicken onion cheese",
                                    "operator": "and"
                                }
                            }
                        },
                        {
                            "range": {
                                "TotalTime": {
                                    "lte": 30
                                }
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        "queryNumber": 4,
        "queryDescription": "Recipes with the Best Protein-Calorie Intake",
        "query":
        {
            "query": {
                "bool": {
                    "filter": [
                        {
                            "script": {
                                "script": {
                                    "source": "if (doc['Calories'].size() > 0 && doc['Calories'].value != 0) {return doc['ProteinContent'].value / doc['Calories'].value >= 0.2;} else {return false;}"
                                }
                            }
                        }
                    ],
                    "should": [
                        {
                            "match": {
                                "Description": {
                                    "query": "healthy gym protein fit strong weight nutritious",
                                    "operator": "or"
                                }
                            }
                        },
                        {
                            "match": {
                                "Keywords": {
                                    "query": "healthy gym protein fit strong weight nutritious",
                                    "operator": "or",
                                    "boost": 3
                                }
                            }
                        },
                        {
                            "match": {
                                "RecipeCategory": {
                                    "query": "healthy gym protein fit strong weight nutritious",
                                    "operator": "or"
                                }
                            }
                        },
                        {
                            "nested": {
                                "path": "Reviews",
                                "query": {
                                    "match": {
                                        "Reviews.Review": {
                                            "query": "healthy gym protein fit strong weight nutritious",
                                            "operator": "or"
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        "queryNumber": 5,
        "queryDescription": "Recipes for Specific Dietary Restrictions",
        "query":
        {
            "query": {
                "bool": {
                    "must_not": [
                        {
                            "match": {
                                "RecipeIngredientParts": {
                                    "query": "milk cheese lactose yogurt",
                                    "operator": "or"
                                }
                            }
                        }
                    ],
                    "should": [
                        {
                            "match": {
                                "Keywords": "lactose free"
                            }
                        },
                        {
                            "match": {
                                "Description": "lactose free intolerant"
                            }
                        },
                        {
                            "match": {
                                "RecipeCategory": "lactose free"
                            }
                        },
                        {
                            "nested": {
                                "path": "Reviews",
                                "query": {
                                    "match": {
                                        "Reviews.Review": "lactose free intolerant"
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        }
    },
    {
        "queryNumber": 6,
        "queryDescription": "How the popularity an ingredient changed in years",
        "query":
        {
            "size": 0,
            "aggs": {
                "calorie_ranges": {
                    "range": {
                        "field": "Calories",
                        "ranges": [
                            { "to": 1400, "key": "Low calorie" },
                            { "from": 1400, "to": 2000, "key": "Medium calorie" },
                            { "from": 2000, "key": "High calorie" }
                        ]
                    },
                    "aggs": {
                        "protein_ranges": {
                            "range": {
                                "field": "ProteinContent",
                                "ranges": [
                                    { "to": 5, "key": "Low protein" },
                                    { "from": 5, "to": 15, "key": "Medium protein" },
                                    { "from": 15, "key": "High protein" }
                                ]
                            }
                        },
                        "fat_ranges": {
                            "range": {
                                "field": "FatContent",
                                "ranges": [
                                    { "to": 5, "key": "Low fat" },
                                    { "from": 5, "to": 15, "key": "Medium fat" },
                                    { "from": 15, "key": "High fat" }
                                ]
                            }
                        },
                        "fiber_ranges": {
                            "range": {
                                "field": "FiberContent",
                                "ranges": [
                                    { "to": 1, "key": "Low fiber" },
                                    { "from": 1, "to": 5, "key": "Medium fiber" },
                                    { "from": 5, "key": "High fiber" }
                                ]
                            }
                        },
                        "sugar_ranges": {
                            "range": {
                                "field": "SugarContent",
                                "ranges": [
                                    { "to": 5, "key": "Low sugar" },
                                    { "from": 5, "to": 15, "key": "Medium sugar" },
                                    { "from": 15, "key": "High sugar" }
                                ]
                            }
                        }
                    }
                }
            }
        }
    },
    {
        "queryNumber": 7,
        "queryDescription": "Recipes that contain \"healthy snacks\" or are high-protein but exclude \"dessert.\"",
        "query":
        {
            "query": {
                "bool": {
                    "must": [
                        { "match": { "RecipeCategory": "Snacks" } },
                        { "range": { "ProteinContent": { "gte": 20 } } }
                    ],
                    "should": [
                        {
                            "match": {
                                "Description": {
                                    "query": "healthy snack",
                                    "operator": "and"
                                }
                            }
                        },
                        {
                            "nested": {
                                "path": "Reviews",
                                "query": {
                                    "match": {
                                        "Reviews.Review": {
                                            "query": "healthy snack",
                                            "operator": "and"
                                        }
                                    }
                                }
                            }
                        },
                        {
                            "match": {
                                "Keywords": {
                                    "query": "healthy snack"
                                }
                            }
                        }
                    ],
                    "must_not": [
                        { "match": { "RecipeCategory": "dessert" } },
                        { "match": { "Keywords": "dessert" } }
                    ]
                }
            }
        }
    },
    {
        "queryNumber": 8,
        "queryDescription": "Aggregation by author name of the authors with the best reviews",
        "query":
        {
            "size": 2,
            "query": {
                "bool": {
                    "must": [
                        { "range": { "AggregatedRating": { "gte": 4 } } },
                        { "range": { "ReviewCount": { "gte": 10 } } },
                        {
                            "nested": {
                                "path": "Reviews",
                                "query": {
                                    "match": {
                                        "Reviews.Review": {
                                            "query": "great excellent good amazing awesome",
                                            "operator": "or"
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "positive_sentiment_per_author": {
                    "terms": {
                        "field": "AuthorId"
                    },
                    "aggs": {
                        "average_rating": {
                            "avg": {
                                "field": "AggregatedRating"
                            }
                        }
                    }
                }
            }
        }
    },
    {
        "queryNumber": 9,
        "queryDescription": "Meals for students",
        "query":
        {
            "query": {
                "bool": {
                    "should": [
                        {
                            "match":
                            {
                                "Description": {
                                    "query": "college student cheap easy",
                                    "operator": "or"
                                }
                            }
                        },
                        {
                            "match":
                            {
                                "Keywords": {
                                    "query": " college student cheap easy",
                                    "operator": "or"
                                }
                            }
                        },
                        {
                            "match":
                            {
                                "RecipeCategory": {
                                    "query": "college student cheap easy",
                                    "operator": "or"
                                }
                            }
                        },
                        {
                            "nested": {
                                "path": "Reviews",
                                "query": {
                                    "match": {
                                        "Reviews.Review": {
                                            "query": "college student cheap easy",
                                            "operator": "or"
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    "must_not": [
                        {
                            "range": {
                                "TotalTime": {
                                    "gte": 60
                                }
                            }
                        }
                    ],
                    "minimum_should_match": 1
                }
            }
        }
    }
]

