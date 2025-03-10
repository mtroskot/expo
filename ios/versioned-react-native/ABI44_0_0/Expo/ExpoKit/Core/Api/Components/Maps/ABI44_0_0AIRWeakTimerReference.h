/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ABI44_0_0AIRWeakTimerReference : NSObject

- (instancetype)initWithTarget:(id)target andSelector:(SEL)selector;
- (void)timerDidFire:(NSTimer *)timer;

@end

NS_ASSUME_NONNULL_END
