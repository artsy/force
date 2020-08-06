/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkDetails_Test_QueryVariables = {};
export type ArtworkDetails_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetails_artwork">;
    } | null;
};
export type ArtworkDetails_Test_QueryRawResponse = {
    readonly artwork: ({
        readonly description: string | null;
        readonly additional_information: string | null;
        readonly sale: ({
            readonly isBenefit: boolean | null;
            readonly isGalleryAuction: boolean | null;
            readonly id: string | null;
        }) | null;
        readonly partner: ({
            readonly internalID: string;
            readonly slug: string;
            readonly type: string | null;
            readonly href: string | null;
            readonly name: string | null;
            readonly initials: string | null;
            readonly locations: ReadonlyArray<({
                readonly city: string | null;
                readonly id: string | null;
            }) | null> | null;
            readonly is_default_profile_public: boolean | null;
            readonly profile: ({
                readonly id: string;
                readonly internalID: string;
                readonly is_followed: boolean | null;
                readonly slug: string;
                readonly icon: ({
                    readonly url: string | null;
                }) | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly category: string | null;
        readonly series: string | null;
        readonly publisher: string | null;
        readonly manufacturer: string | null;
        readonly image_rights: string | null;
        readonly canRequestLotConditionsReport: boolean | null;
        readonly internalID: string;
        readonly framed: ({
            readonly label: string | null;
            readonly details: string | null;
        }) | null;
        readonly signatureInfo: ({
            readonly label: string | null;
            readonly details: string | null;
        }) | null;
        readonly conditionDescription: ({
            readonly label: string | null;
            readonly details: string | null;
        }) | null;
        readonly certificateOfAuthenticity: ({
            readonly label: string | null;
            readonly details: string | null;
        }) | null;
        readonly articles: ReadonlyArray<({
            readonly author: ({
                readonly name: string | null;
                readonly id: string | null;
            }) | null;
            readonly href: string | null;
            readonly published_at: string | null;
            readonly thumbnail_image: ({
                readonly resized: ({
                    readonly url: string | null;
                }) | null;
            }) | null;
            readonly thumbnail_title: string | null;
            readonly id: string | null;
            readonly slug: string | null;
        }) | null> | null;
        readonly literature: string | null;
        readonly exhibition_history: string | null;
        readonly provenance: string | null;
        readonly id: string | null;
    }) | null;
};
export type ArtworkDetails_Test_Query = {
    readonly response: ArtworkDetails_Test_QueryResponse;
    readonly variables: ArtworkDetails_Test_QueryVariables;
    readonly rawResponse: ArtworkDetails_Test_QueryRawResponse;
};



/*
query ArtworkDetails_Test_Query {
  artwork(id: "richard-prince-untitled-fashion") {
    ...ArtworkDetails_artwork
    id
  }
}

fragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {
  description(format: HTML)
}

fragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {
  additional_information: additionalInformation(format: HTML)
  sale {
    isBenefit
    isGalleryAuction
    id
  }
  partner {
    internalID
    slug
    type
    href
    name
    initials
    locations {
      city
      id
    }
    is_default_profile_public: isDefaultProfilePublic
    profile {
      ...FollowProfileButton_profile
      slug
      icon {
        url(version: "square140")
      }
      id
    }
    id
  }
}

fragment ArtworkDetailsAdditionalInfo_artwork on Artwork {
  category
  series
  publisher
  manufacturer
  image_rights: imageRights
  canRequestLotConditionsReport
  internalID
  framed {
    label
    details
  }
  signatureInfo {
    label
    details
  }
  conditionDescription {
    label
    details
  }
  certificateOfAuthenticity {
    label
    details
  }
}

fragment ArtworkDetailsArticles_artwork on Artwork {
  articles(size: 10) {
    author {
      name
      id
    }
    href
    published_at: publishedAt(format: "MMM Do, YYYY")
    thumbnail_image: thumbnailImage {
      resized(width: 300) {
        url
      }
    }
    thumbnail_title: thumbnailTitle
    id
  }
}

fragment ArtworkDetails_artwork on Artwork {
  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork
  ...ArtworkDetailsAboutTheWorkFromPartner_artwork
  ...ArtworkDetailsAdditionalInfo_artwork
  ...ArtworkDetailsArticles_artwork
  articles(size: 10) {
    slug
    id
  }
  literature(format: HTML)
  exhibition_history: exhibitionHistory(format: HTML)
  provenance(format: HTML)
}

fragment FollowProfileButton_profile on Profile {
  id
  internalID
  is_followed: isFollowed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "richard-prince-untitled-fashion"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "label",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "details",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkDetails_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"richard-prince-untitled-fashion\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkDetails_artwork",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkDetails_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"richard-prince-untitled-fashion\")",
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": (v1/*: any*/),
            "storageKey": "description(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": "additional_information",
            "name": "additionalInformation",
            "args": (v1/*: any*/),
            "storageKey": "additionalInformation(format:\"HTML\")"
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale",
            "storageKey": null,
            "args": null,
            "concreteType": "Sale",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isBenefit",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "isGalleryAuction",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "partner",
            "storageKey": null,
            "args": null,
            "concreteType": "Partner",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "type",
                "args": null,
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "initials",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "locations",
                "storageKey": null,
                "args": null,
                "concreteType": "Location",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "city",
                    "args": null,
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ]
              },
              {
                "kind": "ScalarField",
                "alias": "is_default_profile_public",
                "name": "isDefaultProfilePublic",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "profile",
                "storageKey": null,
                "args": null,
                "concreteType": "Profile",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": "is_followed",
                    "name": "isFollowed",
                    "args": null,
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "icon",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "url",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "square140"
                          }
                        ],
                        "storageKey": "url(version:\"square140\")"
                      }
                    ]
                  }
                ]
              },
              (v2/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "category",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "series",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "publisher",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "manufacturer",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "image_rights",
            "name": "imageRights",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "canRequestLotConditionsReport",
            "args": null,
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "framed",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v7/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "signatureInfo",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v7/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "conditionDescription",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v7/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "certificateOfAuthenticity",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "plural": false,
            "selections": (v7/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "articles",
            "storageKey": "articles(size:10)",
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 10
              }
            ],
            "concreteType": "Article",
            "plural": true,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "author",
                "storageKey": null,
                "args": null,
                "concreteType": "Author",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  (v2/*: any*/)
                ]
              },
              (v5/*: any*/),
              {
                "kind": "ScalarField",
                "alias": "published_at",
                "name": "publishedAt",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do, YYYY"
                  }
                ],
                "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
              },
              {
                "kind": "LinkedField",
                "alias": "thumbnail_image",
                "name": "thumbnailImage",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "resized",
                    "storageKey": "resized(width:300)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 300
                      }
                    ],
                    "concreteType": "ResizedImageUrl",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "url",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "ScalarField",
                "alias": "thumbnail_title",
                "name": "thumbnailTitle",
                "args": null,
                "storageKey": null
              },
              (v2/*: any*/),
              (v4/*: any*/)
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "literature",
            "args": (v1/*: any*/),
            "storageKey": "literature(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": "exhibition_history",
            "name": "exhibitionHistory",
            "args": (v1/*: any*/),
            "storageKey": "exhibitionHistory(format:\"HTML\")"
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "provenance",
            "args": (v1/*: any*/),
            "storageKey": "provenance(format:\"HTML\")"
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtworkDetails_Test_Query",
    "id": null,
    "text": "query ArtworkDetails_Test_Query {\n  artwork(id: \"richard-prince-untitled-fashion\") {\n    ...ArtworkDetails_artwork\n    id\n  }\n}\n\nfragment ArtworkDetailsAboutTheWorkFromArtsy_artwork on Artwork {\n  description(format: HTML)\n}\n\nfragment ArtworkDetailsAboutTheWorkFromPartner_artwork on Artwork {\n  additional_information: additionalInformation(format: HTML)\n  sale {\n    isBenefit\n    isGalleryAuction\n    id\n  }\n  partner {\n    internalID\n    slug\n    type\n    href\n    name\n    initials\n    locations {\n      city\n      id\n    }\n    is_default_profile_public: isDefaultProfilePublic\n    profile {\n      ...FollowProfileButton_profile\n      slug\n      icon {\n        url(version: \"square140\")\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  category\n  series\n  publisher\n  manufacturer\n  image_rights: imageRights\n  canRequestLotConditionsReport\n  internalID\n  framed {\n    label\n    details\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n}\n\nfragment ArtworkDetailsArticles_artwork on Artwork {\n  articles(size: 10) {\n    author {\n      name\n      id\n    }\n    href\n    published_at: publishedAt(format: \"MMM Do, YYYY\")\n    thumbnail_image: thumbnailImage {\n      resized(width: 300) {\n        url\n      }\n    }\n    thumbnail_title: thumbnailTitle\n    id\n  }\n}\n\nfragment ArtworkDetails_artwork on Artwork {\n  ...ArtworkDetailsAboutTheWorkFromArtsy_artwork\n  ...ArtworkDetailsAboutTheWorkFromPartner_artwork\n  ...ArtworkDetailsAdditionalInfo_artwork\n  ...ArtworkDetailsArticles_artwork\n  articles(size: 10) {\n    slug\n    id\n  }\n  literature(format: HTML)\n  exhibition_history: exhibitionHistory(format: HTML)\n  provenance(format: HTML)\n}\n\nfragment FollowProfileButton_profile on Profile {\n  id\n  internalID\n  is_followed: isFollowed\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd9a220a4e762bbbe23e9f7526b41775f';
export default node;
