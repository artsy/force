/**
 * @generated SignedSource<<801dfec75aa512cc7492f63ad74ed48d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Collection_collection$data = {
  readonly headerImage: string | null | undefined;
  readonly metaDescription: string | null | undefined;
  readonly showFeaturedArtists: boolean;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"Header_collection">;
  readonly " $fragmentType": "Collection_collection";
};
export type Collection_collection$key = {
  readonly " $data"?: Collection_collection$data;
  readonly " $fragmentSpreads": FragmentRefs<"Collection_collection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Collection_collection",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Header_collection"
    },
    {
      "alias": "metaDescription",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "PLAIN"
        }
      ],
      "kind": "ScalarField",
      "name": "markdownDescription",
      "storageKey": "markdownDescription(format:\"PLAIN\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "headerImage",
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
      "name": "showFeaturedArtists",
      "storageKey": null
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "905f79e256cd1be111ff963a159fa30d";

export default node;
