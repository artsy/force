/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistCardStoryQueryVariables = {};
export type ArtistCardStoryQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistCard_artist">;
    } | null;
};
export type ArtistCardStoryQuery = {
    readonly response: ArtistCardStoryQueryResponse;
    readonly variables: ArtistCardStoryQueryVariables;
};



/*
query ArtistCardStoryQuery {
  artist(id: "unused") {
    ...ArtistCard_artist
    id
  }
}

fragment ArtistCard_artist on Artist {
  name
  slug
  href
  image {
    cropped(width: 400, height: 300) {
      url
    }
  }
  formatted_nationality_and_birthday: formattedNationalityAndBirthday
  ...FollowArtistButton_artist
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  is_followed: isFollowed
  counts {
    follows
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistCardStoryQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistCard_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistCardStoryQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": "artist(id:\"unused\")",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "href",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "image",
            "storageKey": null,
            "args": null,
            "concreteType": "Image",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "cropped",
                "storageKey": "cropped(height:300,width:400)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 300
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 400
                  }
                ],
                "concreteType": "CroppedImageUrl",
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
            "alias": "formatted_nationality_and_birthday",
            "name": "formattedNationalityAndBirthday",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "internalID",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_followed",
            "name": "isFollowed",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "counts",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "follows",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistCardStoryQuery",
    "id": null,
    "text": "query ArtistCardStoryQuery {\n  artist(id: \"unused\") {\n    ...ArtistCard_artist\n    id\n  }\n}\n\nfragment ArtistCard_artist on Artist {\n  name\n  slug\n  href\n  image {\n    cropped(width: 400, height: 300) {\n      url\n    }\n  }\n  formatted_nationality_and_birthday: formattedNationalityAndBirthday\n  ...FollowArtistButton_artist\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'ace3a1babcf2741ba24b8674b576569c';
export default node;
