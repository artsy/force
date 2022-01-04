/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Item_item = {
    readonly __typename: "Artwork";
    readonly internalID: string;
    readonly id: string;
    readonly date: string | null;
    readonly title: string | null;
    readonly artistNames: string | null;
    readonly href: string | null;
    readonly isOfferableFromInquiry: boolean | null;
    readonly image: {
        readonly url: string | null;
    } | null;
    readonly listPrice: ({
        readonly __typename: "Money";
        readonly display: string | null;
    } | {
        readonly __typename: "PriceRange";
        readonly display: string | null;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null;
    readonly " $refType": "Item_item";
} | {
    readonly __typename: "Show";
    readonly id: string;
    readonly fair: {
        readonly name: string | null;
        readonly exhibitionPeriod: string | null;
        readonly location: {
            readonly city: string | null;
        } | null;
    } | null;
    readonly href: string | null;
    readonly name: string | null;
    readonly coverImage: {
        readonly url: string | null;
    } | null;
    readonly " $refType": "Item_item";
} | {
    /*This will never be '%other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
    readonly " $refType": "Item_item";
};
export type Item_item$data = Item_item;
export type Item_item$key = {
    readonly " $data"?: Item_item$data;
    readonly " $fragmentRefs": FragmentRefs<"Item_item">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Item_item",
  "selections": [
    (v0/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "date",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artistNames",
          "storageKey": null
        },
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isOfferableFromInquiry",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": [
                    "large"
                  ]
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:[\"large\"])"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "listPrice",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "Money"
            },
            {
              "kind": "InlineFragment",
              "selections": (v3/*: any*/),
              "type": "PriceRange"
            }
          ],
          "storageKey": null
        }
      ],
      "type": "Artwork"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Fair",
          "kind": "LinkedField",
          "name": "fair",
          "plural": false,
          "selections": [
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "exhibitionPeriod",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Location",
              "kind": "LinkedField",
              "name": "location",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "city",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        (v2/*: any*/),
        (v4/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "coverImage",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "Show"
    }
  ],
  "type": "ConversationItemType"
};
})();
(node as any).hash = 'ed08336624a97b40dd1e62ac0b8634b6';
export default node;
