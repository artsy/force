/**
 * @generated SignedSource<<22cf0cb2b3a076cea9c2bb9c3081d8cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FairMeta_fair$data = {
  readonly metaDescription: string | null | undefined;
  readonly metaDescriptionFallback: string | null | undefined;
  readonly metaImage: {
    readonly src: string | null | undefined;
  } | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "FairMeta_fair";
};
export type FairMeta_fair$key = {
  readonly " $data"?: FairMeta_fair$data;
  readonly " $fragmentSpreads": FragmentRefs<"FairMeta_fair">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairMeta_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "metaDescription",
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    },
    {
      "alias": "metaDescriptionFallback",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "PLAIN"
        }
      ],
      "kind": "ScalarField",
      "name": "about",
      "storageKey": "about(format:\"PLAIN\")"
    },
    {
      "alias": "metaImage",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "src",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "large_rectangle"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"large_rectangle\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Fair",
  "abstractKey": null
};

(node as any).hash = "2dfd7b01e78a134ec59b8456958e9b9b";

export default node;
