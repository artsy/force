/**
 * @generated SignedSource<<31f7ef42f6fdf816a58185406ad3cf34>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowMeta_show$data = {
  readonly formattedEndAt: string | null | undefined;
  readonly formattedStartAt: string | null | undefined;
  readonly href: string | null | undefined;
  readonly metaDescription: string | null | undefined;
  readonly metaImage: {
    readonly src: string | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly partner: {
    readonly name?: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ShowMeta_show";
};
export type ShowMeta_show$key = {
  readonly " $data"?: ShowMeta_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowMeta_show">;
};

const node: ReaderFragment = (function(){
var v0 = {
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
  "name": "ShowMeta_show",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": "metaDescription",
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "metaImage",
      "plural": false,
      "selections": [
        {
          "alias": "src",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "main",
                "normalized",
                "larger",
                "large"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"main\",\"normalized\",\"larger\",\"large\"])"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/)
          ],
          "type": "Partner",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "formattedStartAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMMM D"
        }
      ],
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": "startAt(format:\"MMMM D\")"
    },
    {
      "alias": "formattedEndAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMMM D, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": "endAt(format:\"MMMM D, YYYY\")"
    }
  ],
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "31deb48e2f1ef791fc27802a1a196764";

export default node;
