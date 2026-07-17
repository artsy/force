/**
 * @generated SignedSource<<6287dbfdd74a018b96ad586180a7f5f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useOrder2LineItemData_lineItem$data = {
  readonly artwork: {
    readonly figures: ReadonlyArray<{
      readonly __typename: "Image";
      readonly resized: {
        readonly url: string;
      } | null | undefined;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }>;
    readonly internalID: string;
  } | null | undefined;
  readonly artworkOrEditionSet: {
    readonly __typename: "Artwork";
    readonly dimensions: {
      readonly cm: string | null | undefined;
      readonly in: string | null | undefined;
    } | null | undefined;
    readonly framedDimensions: {
      readonly cm: string | null | undefined;
      readonly in: string | null | undefined;
    } | null | undefined;
    readonly price: string | null | undefined;
  } | {
    readonly __typename: "EditionSet";
    readonly dimensions: {
      readonly cm: string | null | undefined;
      readonly in: string | null | undefined;
    } | null | undefined;
    readonly framedDimensions: {
      readonly cm: string | null | undefined;
      readonly in: string | null | undefined;
    } | null | undefined;
    readonly price: string | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
  readonly artworkVersion: {
    readonly artistNames: string | null | undefined;
    readonly attributionClass: {
      readonly shortDescription: string | null | undefined;
    } | null | undefined;
    readonly date: string | null | undefined;
    readonly image: {
      readonly resized: {
        readonly url: string;
      } | null | undefined;
      readonly url: string | null | undefined;
    } | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "useOrder2LineItemData_lineItem";
};
export type useOrder2LineItemData_lineItem$key = {
  readonly " $data"?: useOrder2LineItemData_lineItem$data;
  readonly " $fragmentSpreads": FragmentRefs<"useOrder2LineItemData_lineItem">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "in",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cm",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "price",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "dimensions",
    "kind": "LinkedField",
    "name": "dimensions",
    "plural": false,
    "selections": (v1/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "dimensions",
    "kind": "LinkedField",
    "name": "framedDimensions",
    "plural": false,
    "selections": (v1/*: any*/),
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "height",
      "value": 138
    },
    {
      "kind": "Literal",
      "name": "width",
      "value": 185
    }
  ],
  "concreteType": "ResizedImageUrl",
  "kind": "LinkedField",
  "name": "resized",
  "plural": false,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": "resized(height:138,width:185)"
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useOrder2LineItemData_lineItem",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "artworkOrEditionSet",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "Artwork",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v2/*: any*/),
          "type": "EditionSet",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkVersion",
      "kind": "LinkedField",
      "name": "artworkVersion",
      "plural": false,
      "selections": [
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
          "concreteType": "AttributionClass",
          "kind": "LinkedField",
          "name": "attributionClass",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "shortDescription",
              "storageKey": null
            }
          ],
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
            (v3/*: any*/),
            (v4/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "artwork",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "includeAll",
              "value": false
            }
          ],
          "concreteType": null,
          "kind": "LinkedField",
          "name": "figures",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "kind": "InlineFragment",
              "selections": [
                (v4/*: any*/)
              ],
              "type": "Image",
              "abstractKey": null
            }
          ],
          "storageKey": "figures(includeAll:false)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "LineItem",
  "abstractKey": null
};
})();

(node as any).hash = "190eae3829041a31350960a00d561018";

export default node;
