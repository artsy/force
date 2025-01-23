/**
 * @generated SignedSource<<678df72844ff5515b336da12a5c771ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrimaryLabelLine_me$data = {
  readonly location: {
    readonly country: string | null | undefined;
    readonly countryCode: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "PrimaryLabelLine_me";
};
export type PrimaryLabelLine_me$key = {
  readonly " $data"?: PrimaryLabelLine_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrimaryLabelLine_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrimaryLabelLine_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyLocation",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "countryCode",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "country",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "df973f68dfe396a387f6bb5f0f4aab7a";

export default node;
